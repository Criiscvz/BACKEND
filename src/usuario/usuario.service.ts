import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuarioService {
 
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository <Usuario>,) {}

  /**
   * Hash de contraseña usando bcryptjs con 10 rondas de salt
   * Método centralizado para garantizar consistencia en todo el sistema
   */
  async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, 10);
  }

  /**
   * Crear usuario con contraseña hasheada automáticamente
   * Usado por el registro de usuarios y creación desde admin
   */
  async createUsuarioWithHashedPassword(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioData = {
      ...createUsuarioDto,
      contrasenaFriada: await this.hashPassword(createUsuarioDto.contrasenaFriada),
    };
    return this.usuarioRepository.save(usuarioData);
  }

  //crud basico

  //esta consulta la uso para el registro de usuarios, se cambio por createUsuario anterior el otro que estaba antes
  createUsuario(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
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

  /**
   * Actualizar usuario
   * Si se incluye contraseña, se hasheará automáticamente
   * Si la contraseña está vacía o es undefined, se mantiene la actual
   */
  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const updateData = { ...updateUsuarioDto };
    
    // Hashear contraseña si se está actualizando y no está vacía
    if (updateData.contrasenaFriada && updateData.contrasenaFriada.trim() !== '') {
      updateData.contrasenaFriada = await this.hashPassword(updateData.contrasenaFriada);
    } else if (updateData.contrasenaFriada === '') {
      // Si viene vacía, eliminarla del update para no sobreescribir
      delete updateData.contrasenaFriada;
    }
    
    return this.usuarioRepository.update({ usuarioId: id }, updateData);
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

