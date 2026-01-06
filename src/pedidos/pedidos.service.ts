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

  createPedido(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    // 1. Preparar datos
    const nuevoPedido = this.pedidoRepository.create(createPedidoDto);
    
    // 2. Valores por defecto
    nuevoPedido.estadoId = 1; // Asumimos 1 = Pendiente
    nuevoPedido.cotizacion = false;
    nuevoPedido.usuarioCreaId = createPedidoDto.usuarioId;
    
    // 3. Convertir dirección a texto si viene como objeto
    if (createPedidoDto.direccion && typeof createPedidoDto.direccion === 'object') {
        // Guardamos como: "Calle Principal, Ciudad, Provincia (Ref: ...)"
        const dir = createPedidoDto.direccion;
        nuevoPedido.direccionEnvio = `${dir.callePrincipal || dir.calleAvenida}, ${dir.ciudad}, ${dir.provincia} (Ref: ${dir.referencia || 'N/A'})`;
    }

    // 4. Guardar (gracias al cascade: true, también guarda los detalles)
    return this.pedidoRepository.save(nuevoPedido);
  }

  getPedidos() {
    return this.pedidoRepository.find({
      relations: ['usuario', 'estado', 'detalles', 'detalles.variante', 'detalles.variante.producto', 'factura'],
      order: { fechaCreacion: 'DESC' }
    });
  }

  // ... Resto de métodos (getPedido, deletePedido, etc.) igual ...
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