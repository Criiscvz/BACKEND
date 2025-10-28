import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsInt()
  @IsNotEmpty()
  varianteId: number;

  @IsInt()
  @IsNotEmpty()
  pedidoId: number;

  @IsInt()
  @IsPositive()
  cantidad: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precio: number;
}
