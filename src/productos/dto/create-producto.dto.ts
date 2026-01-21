import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {
  
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  caracteristicaPrincipal?: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  precio: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  estadoId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usuarioCreaId?: number;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsOptional()
  fechaElaboracion?: Date;

  // --- AGREGAR ESTO PARA CORREGIR EL ERROR ROJO ---
  @IsOptional()
  variantes?: any; 
  // La definimos como 'any' para que acepte el string del FormData 
  // y luego tú lo conviertas a JSON en el controlador sin que TypeScript se queje.
}