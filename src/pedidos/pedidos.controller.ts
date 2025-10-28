import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  createPedido(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidosService.createPedido(createPedidoDto);
  }

  @Get()
  getPedidos(): Promise<Pedido[]> {
    return this.pedidosService.getPedidos();
  }

  @Get(':id')
  getPedido(@Param('id', ParseIntPipe) id: number): Promise<Pedido | null> {
    return this.pedidosService.getPedido(id);
  }

  @Delete(':id')
  deletePedido(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.deletePedido(id);
  }

  @Put(':id')
  updatePedido(@Param('id', ParseIntPipe) id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.updatePedido(id, updatePedidoDto);
  }
}
