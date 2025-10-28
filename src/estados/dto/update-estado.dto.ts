//import { PartialType } from '@nestjs/mapped-types';
//import { CreateEstadoDto } from './create-estado.dto';

//export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {}
export class UpdateEstadoDto {
  nombre?: string;
  tipo?: string;
}


