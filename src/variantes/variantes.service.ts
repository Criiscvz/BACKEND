import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variante } from './entities/variante.entity';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';

@Injectable()
export class VariantesService {
  constructor(
    @InjectRepository(Variante)
    private varianteRepository: Repository<Variante>,
  ) {}

  createVariante(variante: CreateVarianteDto): Promise<Variante> {
    const newVariante = this.varianteRepository.create(variante);
    return this.varianteRepository.save(newVariante);
  }

  getVariantes() {
    return this.varianteRepository.find({ relations: ['producto'] });
  }

  getVariante(id: number) {
    return this.varianteRepository.findOne({
      where: { varianteId: id },
      relations: ['producto'],
    });
  }

  deleteVariante(id: number) {
    return this.varianteRepository.delete({ varianteId: id });
  }

  updateVariante(id: number, updateVarianteDto: UpdateVarianteDto) {
    return this.varianteRepository.update({ varianteId: id }, updateVarianteDto);
  }
}
