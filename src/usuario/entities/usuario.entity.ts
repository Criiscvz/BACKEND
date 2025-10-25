import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Rol } from '../../roles/entities/rol.entity';
import { Direccion } from '../../direcciones/entities/direccion.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ name: 'correo_electronico', length: 255, unique: true })
  correoElectronico: string;

  @Column({ name: 'contrasena_friada', length: 255 })
  contrasenaFriada: string;

  @Column({ name: 'estado_cuenta', type: 'boolean', default: true })
  estadoCuenta: boolean;

  @Column({ name: 'rol_id' })
  rolId: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @Column({ name: 'usuario_crea_id' })
  usuarioCreaId: number;

  @Column({ name: 'usuario_actualiza_id', nullable: true })
  usuarioActualizaId: number;

  @OneToMany(() => Direccion, (direccion) => direccion.usuario)
  direcciones: Direccion[];

  @OneToMany(() => Pedido, (pedido) => pedido.usuario)
  pedidos: Pedido[];
}