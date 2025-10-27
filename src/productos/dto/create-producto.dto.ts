import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  caracteristicaPrincipal: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaElaboracion: Date;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precio: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsInt()
  @IsNotEmpty()
  estadoId: number;

  @IsInt()
  @IsNotEmpty()
  usuarioCreaId: number;
}
