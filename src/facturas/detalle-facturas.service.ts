import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';
import { Repository } from 'typeorm';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';

@Injectable()
export class DetalleFacturasService {

    constructor(@InjectRepository(DetalleFactura) private detalleFacturaRepository: Repository<DetalleFactura>) { }

    createDetalleFactura(detalleFactura: CreateDetalleFacturaDto): Promise<DetalleFactura> {
        const newDetalleFactura = this.detalleFacturaRepository.create(detalleFactura);
        return this.detalleFacturaRepository.save(newDetalleFactura);
    }

    getDetalleFacturas() {
        return this.detalleFacturaRepository.find();
    }

    getDetalleFactura(id: number) {
        return this.detalleFacturaRepository.findOne({ where: { detalleFacturaId: id } });
    }

    deleteDetalleFactura(id: number) {
        return this.detalleFacturaRepository.delete({ detalleFacturaId: id });
    }

    updateDetalleFactura(id: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
        return this.detalleFacturaRepository.update({ detalleFacturaId: id }, updateDetalleFacturaDto);
    }
}