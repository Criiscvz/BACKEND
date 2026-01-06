import { IsString, IsNumber, IsOptional, IsPositive, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'; // <--- IMPORTANTE

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

  // --- CONVERSIÓN DE TIPOS (SOLUCIÓN AL ERROR) ---

  @IsNumber()
  @Min(0)
  @Type(() => Number) // Convierte "10.50" (string) a 10.50 (number)
  precio: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number) // Convierte "5" a 5
  stock: number;

  @IsOptional() // Puede ser opcional si lo asignas en el controller
  @IsNumber()
  @Type(() => Number) // Convierte "1" a 1 (Soluciona tu error de estadoId)
  estadoId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usuarioCreaId?: number;

  // ----------------------------------------------

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsOptional()
  fechaElaboracion?: Date; // Si viene como string ISO, @Type(() => Date) ayudaría también
  
  // Si manejas variantes como JSON string desde el frontend, necesitarás transformarlas aquí,
  // pero por ahora para solucionar el error 400 principal, esto es suficiente.
}