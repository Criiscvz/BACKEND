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

    //logica de registro
    async register({ nombre, apellido, correoElectronico, contrasenaFriada, telefono, usuarioCreaId }: RegistroDto) {

        //getUsuarioByCorreoElectronico es para verificar si el correoElectronico ya existe
        const usuario = await this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);

        //si el usuario ya existe, lanzar una excepcion
        if (usuario) {
            throw new BadRequestException('El correo electrónico ya está en uso');
        }

        //crear el usuario nuevo usando el método centralizado que hashea la contraseña
        await this.usuarioService.createUsuarioWithHashedPassword({
            nombre,
            apellido,
            correoElectronico,
            contrasenaFriada, // Se enviará en texto plano, el service lo hasheará
            telefono,
            usuarioCreaId,
            rolId: Role.USER, // Rol predeterminado para usuarios que se registran
        });

        //retornar el nombre y el correoElectronico del usuario creado
        return {
            nombre,
            correoElectronico,
        };
    }

    //logica de login
    async login({ correoElectronico, contrasenaFriada }: LoginDto) {

        //findByEmailWithPassword es para buscar el usuario por su correoElectronico y traer tambien la contrasenaFriada
        const usuario = await this.usuarioService.findByEmailWithPassword(correoElectronico);

        if (!usuario) {
            throw new UnauthorizedException('Correo electrónico incorrecto');
        }

        //comparar la contrasenaFriada con la contrasena encriptada
        const contrasenaValida = await bcryptjs.compare(contrasenaFriada, usuario.contrasenaFriada);

        if (!contrasenaValida) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        //generar el token
        const payload = {
            sub: usuario.usuarioId, // <--- Agrega esto (Estándar JWT)
            correoElectronico: usuario.correoElectronico,
            rolId: usuario.rolId
        };

        const token = await this.jwtService.signAsync(payload);

        //retornar el token y el correoElectronico
        return {
            token,
            correoElectronico,
        };
    }


    //logica de validacion de usuario
    async validateUser({ correoElectronico, rolId }: { correoElectronico: string, rolId: number }) {
        return this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);
    }
}
