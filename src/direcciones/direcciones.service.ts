import { Injectable } from '@nestjs/common';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Direccion } from './entities/direccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DireccionesService {

  constructor(@InjectRepository(Direccion) private direccionRepository: Repository<Direccion>) {}

  createDireccion(direccion: CreateDireccionDto): Promise<Direccion> {
    const newDireccion = this.direccionRepository.create(direccion);
    return this.direccionRepository.save(newDireccion);
  }

  getDirecciones() {
    return this.direccionRepository.find();
  }

  getDireccion(id: number) {
    return this.direccionRepository.findOne({
      where: { direccionId: id }
    });
  }

  deleteDireccion(id: number) {
    return this.direccionRepository.delete({ direccionId: id });
  }

  updateDireccion(id: number, updateDireccioneDto: UpdateDireccionDto) {
    return this.direccionRepository.update({ direccionId: id }, updateDireccioneDto);
  }
}
