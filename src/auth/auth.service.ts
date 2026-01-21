import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    // Logica de registro
    async register({ nombre, apellido, correoElectronico, contrasenaFriada, telefono, usuarioCreaId }: RegistroDto) {

        const usuario = await this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);

        if (usuario) {
            throw new BadRequestException('El correo electrónico ya está en uso');
        }

        // --- CORRECCIÓN AQUÍ ---
        // Pasamos la contraseña SIN encriptar, porque UsuarioService.createUsuario
        // ahora se encarga de encriptarla automáticamente.
        await this.usuarioService.createUsuario({
            nombre,
            apellido,
            correoElectronico,
            contrasenaFriada: contrasenaFriada, // <--- SE ENVÍA TEXTO PLANO
            telefono,
            usuarioCreaId,
            rolId: Role.USER, 
        });

        return {
            nombre,
            correoElectronico,
        };
    }

    // Logica de login
    async login({ correoElectronico, contrasenaFriada }: LoginDto) {

        const usuario = await this.usuarioService.findByEmailWithPassword(correoElectronico);

        if (!usuario) {
            throw new UnauthorizedException('Correo electrónico incorrecto');
        }

        const contrasenaValida = await bcryptjs.compare(contrasenaFriada, usuario.contrasenaFriada);

        if (!contrasenaValida) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = {
            sub: usuario.usuarioId,
            correoElectronico: usuario.correoElectronico,
            rolId: usuario.rolId
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            correoElectronico,
        };
    }

    async validateUser({ correoElectronico, rolId }: { correoElectronico: string, rolId: number }) {
        return this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);
    }
}