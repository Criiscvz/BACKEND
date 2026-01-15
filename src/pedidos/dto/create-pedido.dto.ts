import { IsArray, IsNumber, IsOptional, IsString, ValidateNested, IsObject, IsBoolean, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

// Clase auxiliar para validar cada producto dentro del array 'detalles'
class DetallePedidoDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    varianteId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    productoId?: number;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    cantidad: number;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    precio: number;
}

export class CreatePedidoDto {
    @IsNumber()
    @Type(() => Number)
    usuarioId: number;

    // Aceptamos el objeto dirección (lo convertiremos a string en el servicio)
    @IsOptional()
    direccion?: any; 

    @IsString()
    transporte: string;

    @IsString()
    metodoPago: string;

    @IsNumber()
    @Type(() => Number)
    contenidoTotal: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetallePedidoDto)
    detalles: DetallePedidoDto[];

    // --- Campos opcionales para evitar errores si el frontend los envía ---
    @IsOptional()
    @IsNumber()
    estadoId?: number;

    @IsOptional()
    @IsNumber()
    usuarioCreaId?: number;
    
    @IsOptional()
    fechaEstimadaEntrega?: Date;
    
    @IsOptional()
    @IsBoolean()
    cotizacion?: boolean;
}