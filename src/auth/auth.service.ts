import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegistroDto } from './dto/registro.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
    ) {}

    async register(registroDto: RegistroDto) {
        await this.usuarioService.createUsuario(registroDto);
    }

    login() {
        return 'login';
    }
}
