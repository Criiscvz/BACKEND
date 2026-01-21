import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Estado } from '../../estados/entities/estado.entity';
import { DetalleFactura } from './detalle-factura.entity';
import { Devolucion } from '../../devoluciones/entities/devolucione.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn({ name: 'factura_id' })
  facturaId: number;

  @Column({ name: 'pedido_id', unique: true })
  pedidoId: number;

  // --- ACTUALIZACIÓN AQUÍ ---
  // Agregamos { onDelete: 'CASCADE' }
  // Si se elimina el Pedido, la Factura también se elimina para no dejar basura en la BD.
  @OneToOne(() => Pedido, (pedido) => pedido.factura, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;
  // --------------------------

  @CreateDateColumn({ name: 'fecha_emision', type: 'timestamp' })
  fechaEmision: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  iva: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'estado_id' })
  estadoId: number;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @Column({ name: 'usuario_crea_id' })
  usuarioCreaId: number;

  @Column({ name: 'usuario_actualiza_id', nullable: true })
  usuarioActualizaId: number;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura, { cascade: true })
  detalles: DetalleFactura[];

  @OneToMany(() => Devolucion, (devolucion) => devolucion.factura)
  devoluciones: Devolucion[];
}