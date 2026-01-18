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

    // Inyecciones para Facturación Automática
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,

    @InjectRepository(DetalleFactura)
    private readonly detalleFacturaRepository: Repository<DetalleFactura>,

    // DataSource para transacciones
    private readonly dataSource: DataSource,
  ) {}

  // =================================================================================
  // CREAR PEDIDO + FACTURA (Transacción Completa)
  // =================================================================================
  async createPedido(createPedidoDto: any): Promise<any> {
    
    // 1. VALIDACIÓN DE SEGURIDAD: Rechazar pedidos vacíos
    if (!createPedidoDto.detalles || createPedidoDto.detalles.length === 0) {
        throw new BadRequestException('No se puede crear un pedido sin productos.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ---------------------------------------------------
      // 2. PROCESAR VARIANTES
      // ---------------------------------------------------
      const detallesProcesados = await Promise.all(
        createPedidoDto.detalles.map(async (detalle) => {
          // Caso A: Ya viene con varianteId
          if (detalle.varianteId) {
            return detalle;
          }
          
          // Caso B: Viene con productoId (hay que buscar/crear variante estándar)
          if (detalle.productoId) {
            let variante = await this.varianteRepository.findOne({
              where: { 
                productoId: detalle.productoId,
                nombre: 'Estándar'
              }
            });

            // Si no existe, la creamos dentro de la transacción
            if (!variante) {
              const producto = await this.productoRepository.findOne({
                where: { productoId: detalle.productoId }
              });

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
                precio: variante.precio // Aseguramos tener el precio aquí
              };
            }
          }
          return detalle;
        })
      );

      // ---------------------------------------------------
      // 3. CALCULAR TOTALES
      // ---------------------------------------------------
      const totalCalculado = detallesProcesados.reduce((acc, item) => {
        return acc + (Number(item.precio) * Number(item.cantidad));
      }, 0);

      // ---------------------------------------------------
      // 4. GUARDAR CABECERA DEL PEDIDO
      // ---------------------------------------------------
      // CORRECCIÓN DE TIPO: Usamos 'as Pedido' para evitar el error de TypeScript
      const nuevoPedido = this.pedidoRepository.create({
        ...createPedidoDto,
        detalles: [], 
        contenidoTotal: totalCalculado 
      } as Pedido); 
      
      nuevoPedido.estadoId = 1; 
      nuevoPedido.cotizacion = false;
      nuevoPedido.usuarioCreaId = createPedidoDto.usuarioId;
      
      // Formatear dirección
      if (createPedidoDto.direccion && typeof createPedidoDto.direccion === 'object') {
          const dir: any = createPedidoDto.direccion;
          nuevoPedido.direccionEnvio = `${dir.callePrincipal || dir.calleAvenida}, ${dir.ciudad}, ${dir.provincia}`;
      }

      const pedidoGuardado = await queryRunner.manager.save(nuevoPedido);

      // ---------------------------------------------------
      // 5. GUARDAR DETALLES DEL PEDIDO
      // ---------------------------------------------------
      for (const item of detallesProcesados) {
          const detalle = this.detallePedidoRepository.create({
            pedidoId: pedidoGuardado.pedidoId,
            varianteId: item.varianteId,
            cantidad: item.cantidad,
            precio: Number(item.precio)
          });
          await queryRunner.manager.save(detalle);
      }

      // ---------------------------------------------------
      // 6. GENERAR FACTURA AUTOMÁTICA
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

      // Confirmar transacción
      await queryRunner.commitTransaction();

      // ---------------------------------------------------
      // 8. RETORNAR RESPUESTA AL FRONTEND
      // ---------------------------------------------------
      return {
        ...pedidoGuardado,     
        total: totalCalculado, 
        facturaId: facturaGuardada.facturaId,
        factura: facturaGuardada,
        detalles: detallesProcesados 
      };

    } catch (error) {
      console.error('Error creando pedido:', error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error al procesar el pedido y facturación');
    } finally {
      await queryRunner.release();
    }
  }

  // =================================================================================
  // MÉTODOS ESTÁNDAR (CRUD)
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