import { IsString, IsEmail, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {

    @IsEmail()
    correoElectronico: string;


    //transfomar: quita los espacios en blanco al inicio y al final
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contrasenaFriada: string;
}