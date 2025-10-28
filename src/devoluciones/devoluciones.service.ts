import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { CreateDevolucioneDto } from './dto/create-devolucione.dto';
import { UpdateDevolucioneDto } from './dto/update-devolucione.dto';
import { Devolucion } from './entities/devolucione.entity';

@Injectable()
export class DevolucionesService {
  constructor(@InjectRepository(Devolucion) private devolucionRepository: Repository<Devolucion>) {}

  createDevolucion(devolucion: CreateDevolucioneDto): Promise<Devolucion> {
    const newDevolucion = this.devolucionRepository.create(devolucion);
    return this.devolucionRepository.save(newDevolucion);
  }

  getDevoluciones() {
   return this.devolucionRepository.find();
  }

  getDevolucion(id: number) {
    return this.devolucionRepository.findOne({ 
      where: { devolucionId: id }
    });
  }

  deleteDevolucion(id: number) {
   return this.devolucionRepository.delete({ devolucionId: id });
  }

  updateDevolucion(id: number, updateDevolucioneDto: UpdateDevolucioneDto) {
    return this.devolucionRepository.update({ devolucionId: id }, updateDevolucioneDto);
  }
}
