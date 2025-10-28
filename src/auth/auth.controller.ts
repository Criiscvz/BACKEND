import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registroDto: RegistroDto
    ){
        return this.authService.register(registroDto);
    }

    @Post('login')
    login(){
        return this.authService.login();
    }
}
