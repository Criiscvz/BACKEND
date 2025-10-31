import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  correoElectronico?: string;

  @IsOptional()
  @IsString()
  contrasenaFriada?: string;

  @IsOptional()
  @IsBoolean()
  estadoCuenta?: boolean;

  @IsOptional()
  @IsInt()
  rolId?: number;

  @IsOptional()
  @IsInt()
  usuarioActualizaId?: number;
}
