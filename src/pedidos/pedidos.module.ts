import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Estado } from 'src/estados/entities/estado.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Variante } from 'src/variantes/entities/variante.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Factura } from 'src/facturas/entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Estado, DetallePedido, Variante, Producto, Factura])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
