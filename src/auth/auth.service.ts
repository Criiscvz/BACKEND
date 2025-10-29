import { BadRequestException, UnauthorizedException ,Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usuarioService: UsuarioService) {}

    //logica de registro
    async register({nombre, apellido, correoElectronico, contrasenaFriada, telefono, usuarioCreaId, rolId}: RegistroDto) {

        const usuario = await this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);

        if (usuario) {
            throw new BadRequestException('El correo electrónico ya está en uso');
        }

        return await this.usuarioService.createUsuario({
            nombre,
            apellido,
            correoElectronico,
            contrasenaFriada : await bcryptjs.hash(contrasenaFriada, 10),
            telefono,
            usuarioCreaId,
            rolId: 1, // Asignar rol predeterminado
        });

    }

    //logica de login
    async login({correoElectronico, contrasenaFriada}: LoginDto) {

        const usuario = await this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);

        if (!usuario) {
            throw new UnauthorizedException('Correo electrónico incorrecto');
        }

        const contrasenaValida = await bcryptjs.compare(contrasenaFriada, usuario.contrasenaFriada);

        if (!contrasenaValida) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        return usuario;
    }
}
