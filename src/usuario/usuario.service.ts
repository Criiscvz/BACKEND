import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
 
  constructor(@InjectRepository(Usuario) private userRepository: Repository <Usuario>) {}

  createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
    const newUsuario = this.userRepository.create(usuario);
    return this.userRepository.save(newUsuario);
  }
  getUsuarios(usuario: CreateUsuarioDto): Promise<Usuario[]> {
   return this.userRepository.find({ where: { correoElectronico: usuario.correoElectronico } });
  }
  getUsuario(id: number) {
    return this.userRepository.findOne({ 
      where: { usuarioId: id }
    });
  }
  deleteUsuario(id: number) {
   return this.userRepository.delete({ usuarioId: id });
  }
}

