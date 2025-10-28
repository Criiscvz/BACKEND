import { Injectable } from '@nestjs/common';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { Historial } from './entities/historial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialService {

  constructor(@InjectRepository(Historial) private historialRepository: Repository <Historial>) {}

    createHistorial(historial: CreateHistorialDto): Promise<Historial> {
      const newHistorial = this.historialRepository.create(historial);
      return this.historialRepository.save(newHistorial);
    }
    getHistoriales() {
     return this.historialRepository.find();
    }
    getHistorial(id: number) {
      return this.historialRepository.findOne({ 
        where: { historialId: id }
      });
    }
    deleteHistorial(id: number) {
     return this.historialRepository.delete({ historialId: id });
    }
    updateHistorial(id: number, updateHistorialDto: UpdateHistorialDto) {
      return this.historialRepository.update({ historialId: id }, updateHistorialDto);
    }
}
