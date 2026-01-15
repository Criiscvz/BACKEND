import { IsOptional, IsNumber, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePedidoDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usuarioId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  contenidoTotal?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  estadoId?: number;

  @IsOptional()
  @IsBoolean()
  cotizacion?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaEstimadaEntrega?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usuarioActualizaId?: number;
}
