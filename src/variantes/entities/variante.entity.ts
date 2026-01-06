// 1. LAS IMPORTACIONES VAN AL PRINCIPIO DEL ARCHIVO
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { DetallePedido } from '../../pedidos/entities/detalle-pedido.entity'; // <--- IMPORTACIÓN AQUÍ

@Entity('variante')
export class Variante {
  @PrimaryGeneratedColumn({ name: 'variante_id' })
  varianteId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @ManyToOne(() => Producto, (producto) => producto.variantes, {
    onDelete: 'CASCADE', // Indispensable para que la DB permita borrar el padre
  })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  // ESTA ES LA RELACIÓN QUE TE DABA ERROR (Ponla aquí abajo)
  @OneToMany(() => DetallePedido, (detalle) => detalle.variante)
  detallesPedido: DetallePedido[];

  @Column({ length: 100 }) 
  nombre: string;

  // EL PRECIO QUE AGREGAMOS ANTES
  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value) || 0
    }
  })
  precio: number;

  @Column({ name: 'slug_variante', length: 150, nullable: true }) // <-- Asegúrate de que diga nullable: true
  slugVariante: string;

  /*@Column({ name: 'caracteristica_variante', length: 200, nullable: true })
  caracteristicaVariante: string;

  /*@Column({ name: 'fecha_elaboracion_va', type: 'date', nullable: true }) // <--- Agregar nullable: true
  fechaElaboracionVa: Date;

  @Column({ name: 'imagen_va', length: 255, nullable: true })
  imagenVa: string;

  /*@Column({ name: 'tiempo_elaboracion', type: 'int', nullable: true })
  tiempoElaboracion: number;

  /*@Column({ type: 'boolean', default: false, nullable: true })
  personalizable: boolean;

  /*@CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;*/
}