import { IsString, IsOptional, Length } from 'class-validator';

export class CreateRoleDto {

    @IsString()
    @Length(3, 50)
    nombre: string;

    @IsOptional()
    @IsString()
    @Length(0, 200)
    descripcion?: string;
}