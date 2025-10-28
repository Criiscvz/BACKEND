import { Transform } from 'class-transformer';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class RegistroDto {

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    apellido: string;  

    @IsEmail()
    correoElectronico: string;  // Cambiar de 'email'

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contrasenaFriada: string;   // Cambiar de 'password'

    @IsOptional()
    @IsString()
    telefono?: string;

    rolId: number;
    usuarioCreaId: number; 
    estadoCuenta: boolean;
}