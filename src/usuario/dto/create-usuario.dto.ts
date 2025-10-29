import { Column } from "typeorm";
import { IsString, IsEmail, MinLength, IsOptional, IsEmpty, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  nombre: string;
  apellido: string;
  telefono?: string;
  correoElectronico: string;
  contrasenaFriada: string;
  estadoCuenta?: boolean;
  rolId?: number;
  usuarioCreaId: number;
  //usuarioActualizaId?: number;
}

