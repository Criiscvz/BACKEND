import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
  ) {}

  createFactura(factura: CreateFacturaDto): Promise<Factura> {
    const newFactura = this.facturaRepository.create(factura);
    return this.facturaRepository.save(newFactura);
  }

  getFacturas() {
    return this.facturaRepository.find({
      relations: ['pedido', 'estado', 'detalles', 'devoluciones'],
    });
  }

  getFactura(id: number) {
    return this.facturaRepository.findOne({
      where: { facturaId: id },
      relations: ['pedido', 'estado', 'detalles', 'devoluciones'],
    });
  }

  deleteFactura(id: number) {
    return this.facturaRepository.delete({ facturaId: id });
  }

  updateFactura(id: number, updateFacturaDto: UpdateFacturaDto) {
    return this.facturaRepository.update({ facturaId: id }, updateFacturaDto);
  }
}
