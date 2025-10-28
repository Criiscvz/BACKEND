import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateDireccionDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  callePrincipal: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  avenida?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  provincia: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  pais: string;
}
