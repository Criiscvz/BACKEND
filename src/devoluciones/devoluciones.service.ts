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
    
    // Si no viene fecha del frontend, usamos la fecha actual del servidor
    if (!newDevolucion.fechaDevolucion) {
        newDevolucion.fechaDevolucion = new Date();
    }
    
    return this.devolucionRepository.save(newDevolucion);
  }

  // MEJORA CRÍTICA: Traemos las relaciones para ver fotos y nombres en el Admin
  getDevoluciones() {
   return this.devolucionRepository.find({
       relations: ['variante', 'variante.producto', 'factura', 'factura.pedido'], 
       order: { fechaDevolucion: 'DESC' }
   });
  }

  getDevolucion(id: number) {
    return this.devolucionRepository.findOne({ 
      where: { devolucionId: id },
      relations: ['variante', 'variante.producto', 'factura']
    });
  }

  deleteDevolucion(id: number) {
   return this.devolucionRepository.delete({ devolucionId: id });
  }

  updateDevolucion(id: number, updateDevolucioneDto: UpdateDevolucioneDto) {
    return this.devolucionRepository.update({ devolucionId: id }, updateDevolucioneDto);
  }
}