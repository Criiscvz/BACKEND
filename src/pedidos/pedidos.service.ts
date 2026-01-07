import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Variante } from '../variantes/entities/variante.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Variante)
    private varianteRepository: Repository<Variante>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async createPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    // 1. Procesar detalles: crear variantes si viene productoId
    const detallesProcesados = await Promise.all(
      createPedidoDto.detalles.map(async (detalle) => {
        // Si tiene varianteId, lo usamos directamente
        if (detalle.varianteId) {
          return detalle;
        }
        
        // Si tiene productoId pero no varianteId, creamos/buscamos variante estándar
        if (detalle.productoId) {
          // Buscar si ya existe una variante estándar para este producto
          let variante = await this.varianteRepository.findOne({
            where: { 
              productoId: detalle.productoId,
              nombre: 'Estándar'
            }
          });

          // Si no existe, crearla
          if (!variante) {
            const producto = await this.productoRepository.findOne({
              where: { productoId: detalle.productoId }
            });

            if (producto) {
              variante = this.varianteRepository.create({
                productoId: detalle.productoId,
                nombre: 'Estándar',
                precio: producto.precio,
                slugVariante: `${producto.slug}-estandar`,
                caracteristicaVariante: 'Variante estándar',
                descripcionVariante: 'Variante estándar creada automáticamente',
                fechaElaboracionVa: new Date(),
                tiempoElaboracion: 0,
                personalizable: false,
              });
              variante = await this.varianteRepository.save(variante);
            }
          }

          // Solo reemplazar si se creó/encontró la variante
          if (variante) {
            return {
              ...detalle,
              varianteId: variante.varianteId,
              productoId: undefined
            };
          }
        }

        return detalle;
      })
    );

    // 2. Crear pedido con detalles procesados
    const nuevoPedido = this.pedidoRepository.create({
      ...createPedidoDto,
      detalles: detallesProcesados
    });
    
    // 3. Valores por defecto
    nuevoPedido.estadoId = 1; // Asumimos 1 = Pendiente
    nuevoPedido.cotizacion = false;
    nuevoPedido.usuarioCreaId = createPedidoDto.usuarioId;
    
    // 4. Convertir dirección a texto si viene como objeto
    if (createPedidoDto.direccion && typeof createPedidoDto.direccion === 'object') {
        const dir = createPedidoDto.direccion;
        nuevoPedido.direccionEnvio = `${dir.callePrincipal || dir.calleAvenida}, ${dir.ciudad}, ${dir.provincia} (Ref: ${dir.referencia || 'N/A'})`;
    }

    // 5. Guardar (gracias al cascade: true, también guarda los detalles)
    return this.pedidoRepository.save(nuevoPedido);
  }

  getPedidos() {
    return this.pedidoRepository.find({
      relations: ['usuario', 'estado', 'detalles', 'detalles.variante', 'detalles.variante.producto', 'factura'],
      order: { fechaCreacion: 'DESC' }
    });
  }

  // ... Resto de métodos (getPedido, deletePedido, etc.) igual ...
  getPedido(id: number) {
    return this.pedidoRepository.findOne({
      where: { pedidoId: id },
      relations: ['usuario', 'estado', 'detalles', 'factura'],
    });
  }

  deletePedido(id: number) {
    return this.pedidoRepository.delete({ pedidoId: id });
  }

  async updatePedido(id: number, updatePedidoDto: UpdatePedidoDto) {
    // Verificar que el pedido existe
    const pedido = await this.pedidoRepository.findOne({ 
      where: { pedidoId: id } 
    });
    
    if (!pedido) {
      throw new Error(`Pedido #${id} no encontrado`);
    }

    // Actualizar solo los campos proporcionados
    await this.pedidoRepository.update({ pedidoId: id }, updatePedidoDto);
    
    // Retornar el pedido actualizado
    return this.pedidoRepository.findOne({ 
      where: { pedidoId: id },
      relations: ['usuario', 'estado', 'detalles']
    });
  }
}