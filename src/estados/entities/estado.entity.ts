import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('estado')
export class Estado {
  @PrimaryGeneratedColumn({ name: 'estado_id' })
  estadoId: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  tipo: string;

  @OneToMany(() => Pedido, (pedido) => pedido.estado)
  pedidos: Pedido[];
}