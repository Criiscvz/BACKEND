import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';

@Injectable()
export class DetallePedidosService {

    constructor(@InjectRepository(DetallePedido) private detallePedidoRepository: Repository<DetallePedido>,) { }

    createDetallePedido(createDetallePedidoDto: CreateDetallePedidoDto) {
        const detallePedido = this.detallePedidoRepository.create(createDetallePedidoDto);
        return this.detallePedidoRepository.save(detallePedido);
    }

    getDetallePedidos() {
        return this.detallePedidoRepository.find();
    }

    getDetallePedido(id: number) {
        return this.detallePedidoRepository.findOne({
            where: { detallePedidoId: id }
        });
    }

    deleteDetallePedido(id: number) {
        return this.detallePedidoRepository.delete({ detallePedidoId: id });
    }

    updateDetallePedido(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
        return this.detallePedidoRepository.update({ detallePedidoId: id }, updateDetallePedidoDto);
    }
}
