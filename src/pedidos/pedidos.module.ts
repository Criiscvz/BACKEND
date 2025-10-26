import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Estado, DetallePedido])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
