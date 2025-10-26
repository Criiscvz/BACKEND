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
}
