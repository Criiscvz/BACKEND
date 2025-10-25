import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn({ name: 'rol_id' })
  rolId: number;

  @Column({ length: 50, unique: true })
  nombre: string;

  @Column({ length: 200, nullable: true })
  descripcion: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}