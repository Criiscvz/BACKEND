import { Column } from "typeorm";
import { IsString, IsEmail, MinLength, IsOptional, IsEmpty, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  correoElectronico: string;

  @IsOptional()
  @IsString()
  contrasenaFriada: string;

  @IsOptional()
  @IsBoolean()
  estadoCuenta?: boolean;

  @IsOptional()
  @IsInt()
  rolId?: number;

  @IsOptional()
  @IsInt()
  usuarioCreaId: number;

  @IsOptional()
  @IsInt()
  usuarioActualizaId?: number;
}

