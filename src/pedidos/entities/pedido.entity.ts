import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Estado } from '../../estados/entities/estado.entity';
import { DetallePedido } from './detalle-pedido.entity';
import { Factura } from '../../facturas/entities/factura.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'pedido_id' })
  pedidoId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'contenido_total', type: 'decimal', precision: 10, scale: 2 })
  contenidoTotal: number;

  @Column({ name: 'estado_id' })
  estadoId: number;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @Column({ type: 'boolean' })
  cotizacion: boolean;

  @Column({ name: 'fecha_estimada_entrega', type: 'date' })
  fechaEstimadaEntrega: Date;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @Column({ name: 'usuario_crea_id' })
  usuarioCreaId: number;

  @Column({ name: 'usuario_actualiza_id', nullable: true })
  usuarioActualizaId: number;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @OneToOne(() => Factura, (factura) => factura.pedido)
  factura: Factura;
}