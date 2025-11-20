import { PartialType } from '@nestjs/mapped-types';
import { CreateDireccionDto } from './create-direccion.dto';


//DTO para actualizar una dirección, extiende de CreateDireccionDto
export class UpdateDireccionDto extends PartialType(CreateDireccionDto) {}
