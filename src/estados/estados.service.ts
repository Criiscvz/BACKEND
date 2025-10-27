import { Injectable } from '@nestjs/common';
import { Estado } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadosService {
  
  constructor(@InjectRepository(Estado) private estadosRepository: Repository<Estado>) {}

  createEstado(estado: CreateEstadoDto): Promise<Estado> {
    const newEstado = this.estadosRepository.create(estado);  
    return this.estadosRepository.save(newEstado);
  }

  getEstados(estado: CreateEstadoDto): Promise<Estado[]> {
   return this.estadosRepository.find();
  }

  getEstado(id: number){
    return this.estadosRepository.findOne({ 
      where: { estadoId: id }
    });
  }

  deleteEstado(id: number) {
   return this.estadosRepository.delete({ estadoId: id });
  }

  updateEstado(id: number, estado: UpdateEstadoDto): Promise<Estado> {
    return this.estadosRepository.save({ ...estado, estadoId: id });
  }
}
