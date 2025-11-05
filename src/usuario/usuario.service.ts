import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
 
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository <Usuario>,) {}

  
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
  updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
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

