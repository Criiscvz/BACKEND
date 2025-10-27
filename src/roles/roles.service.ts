import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Rol) private roleRepository: Repository<Rol>) {}

  createRol(rol: CreateRoleDto) {
    const newRol = this.roleRepository.create(rol);
    return this.roleRepository.save(newRol);
  }
  
}
