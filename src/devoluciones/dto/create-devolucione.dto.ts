import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDevolucioneDto {
  @IsInt()
  @IsNotEmpty()
  facturaId: number;

  @IsInt()
  @IsNotEmpty()
  varianteId: number;

  @IsString()
  @IsNotEmpty()
  motivo: string;

  // LE QUITAMOS LA VALIDACIÓN ESTRICTA DE FECHA
  @IsOptional()
  fechaDevolucion?: Date; 

  @IsInt()
  @IsOptional()
  estadoId?: number;

  @IsInt()
  @IsNotEmpty()
  usuarioCreaId: number;
}