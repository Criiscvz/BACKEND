import { Injectable } from '@nestjs/common';
import { Estado } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadoService {

  constructor(@InjectRepository(Estado) private estadoRepository: Repository <Estado>) {}

    createEstado(estado: CreateEstadoDto): Promise<Estado> {
      const newEstado = this.estadoRepository.create(estado);
      return this.estadoRepository.save(newEstado);
    }
    getEstados() {
     return this.estadoRepository.find();
    }
    getEstado(id: number) {
      return this.estadoRepository.findOne({ 
        where: { estadoId: id }
      });
    }
    deleteEstado(id: number) {
     return this.estadoRepository.delete({ estadoId: id });
    }
    updateEstado(id: number, updateEstadoDto: UpdateEstadoDto) {
      return this.estadoRepository.update({ estadoId: id }, updateEstadoDto);
    }
}
