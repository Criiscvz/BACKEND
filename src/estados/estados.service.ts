import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Estado } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadoService implements OnModuleInit {
  private readonly logger = new Logger(EstadoService.name);

  constructor(
    @InjectRepository(Estado) private estadoRepository: Repository<Estado>
  ) {}

  // --- SEEDER MEJORADO ---
  async onModuleInit() {
    // Definimos los estados que SIEMPRE deben existir
    const estadosIniciales = [
      { estadoId: 1, nombre: 'Pendiente', tipo: 'Pedido' },
      { estadoId: 2, nombre: 'Procesando', tipo: 'Pedido' },
      { estadoId: 3, nombre: 'Enviado', tipo: 'Pedido' },
      { estadoId: 4, nombre: 'Entregado', tipo: 'Pedido' },
      { estadoId: 5, nombre: 'Cancelado', tipo: 'Pedido' }
    ];

    // .save() en TypeORM funciona como un "Upsert":
    // Si el ID existe, lo actualiza. Si no existe, lo crea.
    await this.estadoRepository.save(estadosIniciales);
    
    this.logger.log('✅ Estados del sistema verificados y actualizados correctamente.');
  }
  // -----------------------

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