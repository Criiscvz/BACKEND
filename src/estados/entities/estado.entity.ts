import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estado')
export class Estado {
  @PrimaryGeneratedColumn({ name: 'estado_id' })
  estadoId: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 50 })
  tipo: string;
}