import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Rol) private roleRepository: Repository<Rol>) {}

  createRol(rol: CreateRoleDto) {
    const newRol = this.roleRepository.create(rol);
    return this.roleRepository.save(newRol);
  }
  getRoles() {
   return this.roleRepository.find();
  }
  getRol(id: number) {
    return this.roleRepository.findOne({ 
      where: { rolId: id }
    });
  }
  deleteRol(id: number) {
   return this.roleRepository.delete({ rolId:  id });
  }
  updateRol(id: number, updateRolDto: UpdateRoleDto) {
    return this.roleRepository.update({ rolId: id }, updateRolDto);
  }

  
}
