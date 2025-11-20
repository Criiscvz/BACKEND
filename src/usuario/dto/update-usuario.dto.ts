import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';


//DTO para actualizar un usuario, extiende de CreateUsuarioDto
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
