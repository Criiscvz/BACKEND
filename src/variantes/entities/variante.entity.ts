import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { DetallePedido } from '../../pedidos/entities/detalle-pedido.entity';

@Entity('variante')
export class Variante {
  @PrimaryGeneratedColumn({ name: 'variante_id' })
  varianteId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto, (producto) => producto.variantes)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'slug_variante', length: 150 })
  slugVariante: string;

  @Column({ name: 'caracteristica_variante', length: 200 })
  caracteristicaVariante: string;

  @Column({ name: 'descripcion_variante', type: 'text', nullable: true })
  descripcionVariante: string;

  @Column({ name: 'fecha_elaboracion_va', type: 'date' })
  fechaElaboracionVa: Date;

  @Column({ name: 'imagen_va', length: 255, nullable: true })
  imagenVa: string;

  @Column({ name: 'tiempo_elaboracion', type: 'int' })
  tiempoElaboracion: number;

  @Column({ type: 'boolean' })
  personalizable: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @Column({ name: 'usuario_crea_id' })
  usuarioCreaId: number;

  @Column({ name: 'usuario_actualiza_id', nullable: true })
  usuarioActualizaId: number;

  @OneToMany(() => DetallePedido, (detalle) => detalle.variante)
  detallesPedido: DetallePedido[];
}