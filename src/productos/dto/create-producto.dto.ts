import { IsString, IsNumber, IsOptional, IsDate, IsPositive, IsNotEmpty, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';

// 1. DTO para validar cada variante que venga del formulario
// 1. DEFINES LA CLASE PARA LA VARIANTE
class CreateVarianteDto {
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio: number;
}
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

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fechaElaboracion: Date;

  @IsString()
  @IsOptional()
  imagen?: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  precio: number;

  @Type(() => Number)
  @IsNumber()
  stock: number;

  @Type(() => Number)
  @IsNumber()
  estadoId: number;

  // ESTO ARREGLA LOS ERRORES DEL CONTROLLER
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usuarioCreaId?: number; 

  // ESTO PERMITE RECIBIR LAS VARIANTES DESDE EL FRONTEND
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVarianteDto)
  variantes?: CreateVarianteDto[];
}