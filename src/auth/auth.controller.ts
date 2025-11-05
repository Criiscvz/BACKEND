import { Body, Controller, Get, Post, UseGuards,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { Rol } from 'src/roles/entities/rol.entity';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
    user: {
        correoElectronico: string;
        rolId: number;
    };
}

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

    //@Get('profile')
    //@Roles(Role.ADMIN)
    //@UseGuards(AuthGuard, RolesGuard)
    //getProfile(@Req() req: RequestWithUser) {
    //    return this.authService.validateUser(req.user);
    //}


    @Get('profile')
    @Auth(Role.USER)
    getProfile(@Req() req: RequestWithUser) {
        return this.authService.validateUser(req.user);
        
    }
}
