// src/productos/dto/create-producto.dto.ts
import { IsString, IsNumber, IsOptional, IsDate, IsPositive, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  caracteristicaPrincipal: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  // Transforma el string de fecha que viene del frontend a un objeto Date real
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fechaElaboracion: Date;

  @IsString()
  @IsOptional()
  imagen?: string;

  // --- AQUÍ ESTÁ LA MAGIA PARA ARREGLAR EL ERROR 400 ---
  @Type(() => Number) // Convierte "100" a 100
  @IsNumber()
  @IsPositive()
  precio: number;

  @Type(() => Number) // Convierte "10" a 10
  @IsNumber()
  stock: number;

  @Type(() => Number)
  @IsNumber()
  estadoId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  usuarioCreaId: number;
}