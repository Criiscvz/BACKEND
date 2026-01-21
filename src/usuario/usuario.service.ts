import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt'; // <--- IMPORTANTE: Importar bcrypt

@Injectable()
export class UsuarioService {
 
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository <Usuario>,) {}

  
  //crud basico

  // MODIFICADO: Ahora encripta la contraseña antes de guardar
  async createUsuario(createUsuarioDto: CreateUsuarioDto) {
    // 1. Extraer la contraseña y el resto de datos
    const { contrasenaFriada, ...userData } = createUsuarioDto;
    
    // 2. Si viene contraseña, encriptarla
    let passwordFinal = contrasenaFriada;
    if (contrasenaFriada) {
        passwordFinal = await bcrypt.hash(contrasenaFriada, 10);
    }

    // 3. Crear el objeto con la contraseña ya encriptada
    const nuevoUsuario = this.usuarioRepository.create({
        ...userData,
        contrasenaFriada: passwordFinal
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

  getUsuarios() {
   return this.usuarioRepository.find();
  }

  getUsuario(id: number) {
    return this.usuarioRepository.findOne({ 
      where: { usuarioId: id }
    });
  }

  deleteUsuario(id: number) {
   return this.usuarioRepository.delete({ usuarioId: id });
  }

  // MODIFICADO: También encriptar al actualizar si se envía una nueva contraseña
  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    
    // Si el DTO trae contraseña, la encriptamos antes de actualizar
    if (updateUsuarioDto.contrasenaFriada) {
        updateUsuarioDto.contrasenaFriada = await bcrypt.hash(updateUsuarioDto.contrasenaFriada, 10);
    }

    return this.usuarioRepository.update({ usuarioId: id }, updateUsuarioDto);
  }


  //consultar usuario por correo electronico para el registro y login
  getUsuarioByCorreoElectronico(correoElectronico: string) {
    return this.usuarioRepository.findOneBy({ correoElectronico });
  }

  //hacer una querie mas persocalizada con findOne, para el login
  findByEmailWithPassword(correoElectronico: string) {
    return this.usuarioRepository.findOne({
      where: { correoElectronico },
      select: ['usuarioId', 'nombre', 'correoElectronico', 'contrasenaFriada', 'rolId'],
    });
  }

}