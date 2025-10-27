import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  tipo: string;
}
