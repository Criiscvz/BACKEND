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

        //crear el usuario nuevo
        //usuarioService.createUsuario es para crear el usuario
        await this.usuarioService.createUsuario({
            nombre,
            apellido,
            correoElectronico,
            //aqui se encripta la contrasenaFriada, (10 es el numero de rondas de encriptacion)
            contrasenaFriada: await bcryptjs.hash(contrasenaFriada, 10),
            telefono,
            usuarioCreaId,

            // CAMBIA ESTO:
            // rolId: 1, 
            // POR ESTO:
            rolId: Role.USER, // Así el código se explica solo y es más seguro.
            //rolId: 1, // Rol predeterminado si no se envía
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
