import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Factura } from './factura.entity';
import { Variante } from '../../variantes/entities/variante.entity';

@Entity('detalle_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn({ name: 'detalle_factura_id' })
  detalleFacturaId: number;

  @Column({ name: 'factura_id' })
  facturaId: number;

  @ManyToOne(() => Factura, (factura) => factura.detalles)
  @JoinColumn({ name: 'factura_id' })
  factura: Factura;

  @Column({ name: 'variante_id' })
  varianteId: number;

  @ManyToOne(() => Variante)
  @JoinColumn({ name: 'variante_id' })
  variante: Variante;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
}
