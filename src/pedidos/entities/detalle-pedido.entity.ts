import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Variante } from '../../variantes/entities/variante.entity';

@Entity('detalle_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn({ name: 'detalle_pedido_id' })
  detallePedidoId: number;

  @Column({ name: 'variante_id' })
  varianteId: number;

  @ManyToOne(() => Variante, (variante) => variante.detallesPedido)
  @JoinColumn({ name: 'variante_id' })
  variante: Variante;

  @Column({ name: 'pedido_id' })
  pedidoId: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn({ name: 'fecha_agregado_pedido', type: 'timestamp' })
  fechaAgregadoPedido: Date;
}
