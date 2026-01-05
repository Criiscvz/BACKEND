import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';

// PartialType toma todo lo que definiste en CreateProductoDto 
// y lo convierte en opcional automáticamente para la actualización.
export class UpdateProductoDto extends PartialType(CreateProductoDto) {}