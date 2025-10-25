import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('direccion')
export class Direccion {
  @PrimaryGeneratedColumn({ name: 'direccion_id' })
  direccionId: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.direcciones)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'calle_principal', length: 200 })
  callePrincipal: string;

  @Column({ length: 200, nullable: true })
  avenida: string;

  @Column({ length: 100 })
  ciudad: string;

  @Column({ length: 100 })
  provincia: string;

  @Column({ length: 100 })
  pais: string;

  @CreateDateColumn({ name: 'fecha_registro_direccion', type: 'timestamp' })
  fechaRegistroDireccion: Date;
}