import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm'; 

// Entidades propias del módulo Pedidos
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detalle-pedido.entity'; 
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

// Entidades de otros módulos
import { Variante } from '../variantes/entities/variante.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Factura } from 'src/facturas/entities/factura.entity';
import { DetalleFactura } from 'src/facturas/entities/detalle-factura.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    
    @InjectRepository(DetallePedido) 
    private readonly detallePedidoRepository: Repository<DetallePedido>,

    @InjectRepository(Variante)
    private readonly varianteRepository: Repository<Variante>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,

    @InjectRepository(DetalleFactura)
    private readonly detalleFacturaRepository: Repository<DetalleFactura>,

    private readonly dataSource: DataSource,
  ) {}

  // =================================================================================
  // CREAR PEDIDO + FACTURA + VALIDACIÓN DE STOCK ESTRICTA
  // =================================================================================
  async createPedido(createPedidoDto: any): Promise<any> {
    
    // 1. VALIDACIÓN BÁSICA: No permitir pedidos vacíos
    if (!createPedidoDto.detalles || createPedidoDto.detalles.length === 0) {
        throw new BadRequestException('No se puede crear un pedido sin productos.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ---------------------------------------------------
      // 2. PREPARAR DATOS (Buscar o Crear Variante Estándar)
      // ---------------------------------------------------
      const detallesProcesados = await Promise.all(
        createPedidoDto.detalles.map(async (detalle) => {
          // Si ya tiene varianteId, lo usamos
          if (detalle.varianteId) return detalle;
          
          // Si viene con productoId, buscamos su variante estándar
          if (detalle.productoId) {
            let variante = await this.varianteRepository.findOne({
              where: { productoId: detalle.productoId, nombre: 'Estándar' }
            });

            // Si no existe la variante estándar, la creamos al vuelo
            if (!variante) {
              const producto = await this.productoRepository.findOne({ where: { productoId: detalle.productoId } });
              if (producto) {
                const nuevaVariante = this.varianteRepository.create({
                  productoId: detalle.productoId,
                  nombre: 'Estándar',
                  precio: producto.precio,
                  slugVariante: `${producto.slug}-estandar`,
                  caracteristicaVariante: 'Variante estándar',
                  descripcionVariante: 'Generada automáticamente',
                  fechaElaboracionVa: new Date(),
                  tiempoElaboracion: 0,
                  personalizable: false,
                });
                variante = await queryRunner.manager.save(nuevaVariante);
              }
            }
            if (variante) {
              return {
                ...detalle,
                varianteId: variante.varianteId,
                productoId: undefined, 
                precio: variante.precio
              };
            }
          }
          return detalle;
        })
      );

      // ---------------------------------------------------
      // 3. CALCULAR EL TOTAL A PAGAR
      // ---------------------------------------------------
      const totalCalculado = detallesProcesados.reduce((acc, item) => {
        return acc + (Number(item.precio) * Number(item.cantidad));
      }, 0);

      // ---------------------------------------------------
      // 4. GUARDAR LA CABECERA DEL PEDIDO
      // ---------------------------------------------------
      const nuevoPedido = this.pedidoRepository.create({
        ...createPedidoDto,
        detalles: [], // Los guardaremos manualmente para controlar el stock
        contenidoTotal: totalCalculado 
      } as Pedido); 
      
      nuevoPedido.estadoId = 1; // 1 = Pendiente
      nuevoPedido.cotizacion = false;
      nuevoPedido.usuarioCreaId = createPedidoDto.usuarioId;
      
      // Guardar dirección como texto simple para el historial
      if (createPedidoDto.direccion && typeof createPedidoDto.direccion === 'object') {
          const dir: any = createPedidoDto.direccion;
          nuevoPedido.direccionEnvio = `${dir.callePrincipal || dir.calleAvenida}, ${dir.ciudad}, ${dir.provincia}`;
      }

      const pedidoGuardado = await queryRunner.manager.save(nuevoPedido);

      // ---------------------------------------------------
      // 5. GUARDAR DETALLES, VALIDAR Y RESTAR STOCK
      // ---------------------------------------------------
      for (const item of detallesProcesados) {
          
          // A. Buscar información del producto asociado a la variante
          const varianteRelacionada = await queryRunner.manager.findOne(Variante, {
              where: { varianteId: item.varianteId },
              relations: ['producto']
          });

          if (!varianteRelacionada || !varianteRelacionada.producto) {
              throw new NotFoundException(`Producto no encontrado para la variante ${item.varianteId}`);
          }

          const producto = varianteRelacionada.producto;

          // B. ¡VALIDACIÓN CLAVE! ¿Hay suficiente stock?
          if (producto.stock < item.cantidad) {
              // Si pide 5 y hay 2, esto detiene todo el proceso.
              throw new BadRequestException(
                  `Stock insuficiente para "${producto.nombre}". Solicitado: ${item.cantidad}, Disponible: ${producto.stock}`
              );
          }

          // C. Si hay stock, lo restamos de la base de datos
          await queryRunner.manager.decrement(
              Producto, 
              { productoId: producto.productoId }, 
              'stock', 
              item.cantidad
          );

          // D. Guardamos el registro del detalle de pedido
          const detalle = this.detallePedidoRepository.create({
            pedidoId: pedidoGuardado.pedidoId,
            varianteId: item.varianteId,
            cantidad: item.cantidad,
            precio: Number(item.precio)
          });
          await queryRunner.manager.save(detalle);
      }

      // ---------------------------------------------------
      // 6. GENERAR FACTURA
      // ---------------------------------------------------
      const IVA_PORCENTAJE = 0.15;
      const subtotalCalc = Number((totalCalculado / (1 + IVA_PORCENTAJE)).toFixed(2));
      const ivaCalc = Number((totalCalculado - subtotalCalc).toFixed(2));

      const nuevaFactura = this.facturaRepository.create({
        pedidoId: pedidoGuardado.pedidoId,
        subtotal: subtotalCalc,
        iva: ivaCalc,
        total: totalCalculado,
        estadoId: 1,
        usuarioCreaId: pedidoGuardado.usuarioCreaId,
      });

      const facturaGuardada = await queryRunner.manager.save(nuevaFactura);

      // ---------------------------------------------------
      // 7. GUARDAR DETALLES DE FACTURA
      // ---------------------------------------------------
      for (const item of detallesProcesados) {
           const precioUnitarioSinIva = Number((item.precio / (1 + IVA_PORCENTAJE)).toFixed(2));
           const totalLinea = Number((precioUnitarioSinIva * item.cantidad).toFixed(2));

           const detalleFactura = this.detalleFacturaRepository.create({
             facturaId: facturaGuardada.facturaId,
             varianteId: item.varianteId,
             cantidad: item.cantidad,
             precioUnitario: precioUnitarioSinIva,
             total: totalLinea
           });
           await queryRunner.manager.save(detalleFactura);
      }

      // Todo salió bien: Confirmamos los cambios en la base de datos
      await queryRunner.commitTransaction();

      return {
        ...pedidoGuardado,     
        total: totalCalculado, 
        facturaId: facturaGuardada.facturaId,
        factura: facturaGuardada,
        detalles: detallesProcesados 
      };

    } catch (error) {
      // Si algo falla (ej. stock insuficiente), deshacemos todo
      console.error('Error creando pedido:', error);
      await queryRunner.rollbackTransaction();
      
      // Si el error es de stock, lo enviamos tal cual al usuario
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
          throw error;
      }
      throw new InternalServerErrorException('Error al procesar el pedido y facturación');
    } finally {
      await queryRunner.release();
    }
  }

  // =================================================================================
  // MÉTODOS CRUD ESTÁNDAR
  // =================================================================================

  getPedidos() {
    return this.pedidoRepository.find({
      relations: ['usuario', 'estado', 'detalles', 'detalles.variante', 'detalles.variante.producto', 'factura'],
      order: { fechaCreacion: 'DESC' }
    });
  }

  getPedido(id: number) {
    return this.pedidoRepository.findOne({
      where: { pedidoId: id },
      relations: ['usuario', 'estado', 'detalles', 'factura'],
    });
  }

  async deletePedido(id: number) {
    return this.pedidoRepository.delete({ pedidoId: id });
  }

  async updatePedido(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.pedidoRepository.findOne({ where: { pedidoId: id } });
    if (!pedido) throw new NotFoundException(`Pedido #${id} no encontrado`);
    
    await this.pedidoRepository.update({ pedidoId: id }, updatePedidoDto);
    
    return this.pedidoRepository.findOne({ 
      where: { pedidoId: id }, 
      relations: ['usuario', 'estado', 'detalles'] 
    });
  }
}