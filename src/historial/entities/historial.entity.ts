import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('historial')
export class Historial {
  @PrimaryGeneratedColumn({ name: 'historial_id' })
  historialId: number;

  @Column({ name: 'tabla_afectada', length: 100 })
  tablaAfectada: string;

  @Column({ name: 'registro_id' })
  registroId: number;

  @Column({ length: 50 })
  accion: string;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'text' })
  descripcion: string;
}