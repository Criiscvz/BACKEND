import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
// YA NO IMPORTAMOS BCRYPT AQUÍ

@Injectable()
export class UsuarioService {
 
  constructor(@InjectRepository(Usuario) private usuarioRepository: Repository <Usuario>,) {}

  // --- CRUD BÁSICO ---

  // 1. Create: Guardamos directo (ya no encriptamos aquí)
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

  // 2. Update: Actualizamos directo (ya no encriptamos aquí)
  updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update({ usuarioId: id }, updateUsuarioDto);
  }

  // --- MÉTODOS DE CONSULTA ---

  // Para validar si existe el correo
  getUsuarioByCorreoElectronico(correoElectronico: string) {
    return this.usuarioRepository.findOneBy({ correoElectronico });
  }

  // Para el login (necesitamos la contraseña oculta)
  findByEmailWithPassword(correoElectronico: string) {
    return this.usuarioRepository.findOne({
      where: { correoElectronico },
      select: ['usuarioId', 'nombre', 'correoElectronico', 'contrasenaFriada', 'rolId'],
    });
  }
}