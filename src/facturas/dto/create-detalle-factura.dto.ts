import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsInt()
  @IsNotEmpty()
  facturaId: number;

  @IsInt()
  @IsNotEmpty()
  varianteId: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precioUnitario: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total: number;
}
