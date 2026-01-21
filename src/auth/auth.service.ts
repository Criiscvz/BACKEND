import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs'; // <--- AQUÍ SÍ USAMOS BCRYPTJS
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    // REGISTRO
    async register({ nombre, apellido, correoElectronico, contrasenaFriada, telefono, usuarioCreaId }: RegistroDto) {

        const usuario = await this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);

        if (usuario) {
            throw new BadRequestException('El correo electrónico ya está en uso');
        }

        // AQUÍ ENCRIPTAMOS ANTES DE MANDAR A GUARDAR
        await this.usuarioService.createUsuario({
            nombre,
            apellido,
            correoElectronico,
            contrasenaFriada: await bcryptjs.hash(contrasenaFriada, 10), // <--- ESTO ES CORRECTO AQUÍ
            telefono,
            usuarioCreaId,
            rolId: Role.USER, 
        });

        return {
            nombre,
            correoElectronico,
        };
    }

    // LOGIN
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