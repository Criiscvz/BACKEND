import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { Column } from 'typeorm';

export class RegistroDto {

  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @MinLength(1)
  apellido: string;

  @IsEmail()
  correoElectronico: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  contrasenaFriada: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsInt()
  @IsNotEmpty()
  usuarioCreaId: number;

  //@IsOptional()
  //@IsInt()
  //rolId: number;

}