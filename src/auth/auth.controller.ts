import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(
        @Body()
        registroDto: RegistroDto
    ){
        return this.authService.register(registroDto);
    }

    @Post('login')
    login(
        @Body() 
        loginDto: LoginDto
    ){
        return this.authService.login(loginDto);
    }
}
