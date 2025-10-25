import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Factura } from '../../facturas/entities/factura.entity';
import { Variante } from '../../variantes/entities/variante.entity';
import { Estado } from '../../estados/entities/estado.entity';

@Entity('devolucion')
export class Devolucion {
  @PrimaryGeneratedColumn({ name: 'devolucion_id' })
  devolucionId: number;

  @Column({ name: 'factura_id' })
  facturaId: number;

  @ManyToOne(() => Factura, (factura) => factura.devoluciones)
  @JoinColumn({ name: 'factura_id' })
  factura: Factura;

  @Column({ name: 'variante_id' })
  varianteId: number;

  @ManyToOne(() => Variante)
  @JoinColumn({ name: 'variante_id' })
  variante: Variante;

  @Column({ type: 'text' })
  motivo: string;

  @Column({ name: 'fecha_devolucion', type: 'date' })
  fechaDevolucion: Date;

  @Column({ name: 'estado_id' })
  estadoId: number;

  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @Column({ name: 'usuario_crea_id' })
  usuarioCreaId: number;
}