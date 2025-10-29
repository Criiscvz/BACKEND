import { IsString, IsEmail, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {

    @IsEmail()
    correoElectronico: string;


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    contrasenaFriada: string;
}