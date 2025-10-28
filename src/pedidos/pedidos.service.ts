import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  createPedido(pedido: CreatePedidoDto): Promise<Pedido> {
    const newPedido = this.pedidoRepository.create(pedido);
    return this.pedidoRepository.save(newPedido);
  }

  getPedidos() {
    return this.pedidoRepository.find({
      relations: ['usuario', 'estado', 'detalles', 'factura'],
    });
  }

  getPedido(id: number) {
    return this.pedidoRepository.findOne({
      where: { pedidoId: id },
      relations: ['usuario', 'estado', 'detalles', 'factura'],
    });
  }

  deletePedido(id: number) {
    return this.pedidoRepository.delete({ pedidoId: id });
  }

  updatePedido(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoRepository.update({ pedidoId: id }, updatePedidoDto);
  }
}
