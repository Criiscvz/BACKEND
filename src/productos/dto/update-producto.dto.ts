// src/productos/dto/update-producto.dto.ts
import { IsString, IsNumber, IsOptional, IsDate, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  caracteristicaPrincipal?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaElaboracion?: Date;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stock?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  estadoId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  usuarioActualizaId?: number;
}