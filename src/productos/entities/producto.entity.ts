import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Estado } from '../../estados/entities/estado.entity';
import { Variante } from '../../variantes/entities/variante.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'producto_id' })
  productoId: number;

  @Column({ length: 100 })
  nombre: string;

  /*@Column({ length: 100 })
  marca: string;*/

  @Column({ length: 150, unique: true })
  slug: string;

  /*@Column({ name: 'caracteristica_principal', length: 200 })
  caracteristicaPrincipal: string;*/

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ name: 'fecha_elaboracion', type: 'date' })
  fechaElaboracion: Date;

  @Column({ length: 255, nullable: true })
  imagen: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) || 0, // Si es nulo o vacío, devuelve 0
    },
  })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

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

  @OneToMany(() => Variante, (variante) => variante.producto, { 
      cascade: true, 
      eager: true,
      // ESTA LÍNEA ES LA SOLUCIÓN:
      // Indica que si una variante se quita del arreglo, debe ser borrada de la DB.

  })
  variantes: Variante[];
}