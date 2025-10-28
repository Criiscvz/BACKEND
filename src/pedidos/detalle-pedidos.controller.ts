import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { DetallePedido } from './entities/detalle-pedido.entity';

@Controller('detalle-pedidos')
export class DetallePedidosController {

  constructor(private detallePedidosService: DetallePedidosService) {}

  @Post()
  createDetallePedido(@Body() createDetallePedidoDto: CreateDetallePedidoDto): Promise<DetallePedido> {
    return this.detallePedidosService.createDetallePedido(createDetallePedidoDto);
  }

    @Get()
    getDetallePedidos(): Promise<DetallePedido[]> {
        return this.detallePedidosService.getDetallePedidos();
    }

    @Get(':id')
    getDetallePedido(@Param('id', ParseIntPipe) id: number): Promise<DetallePedido | null> {
        return this.detallePedidosService.getDetallePedido(id);
    }

    @Delete(':id')
    deleteDetallePedido(@Param('id', ParseIntPipe) id: number) {
        return this.detallePedidosService.deleteDetallePedido(id);
    }

    @Put(':id')
    updateDetallePedido(@Param('id', ParseIntPipe) id: number, @Body() updateDetallePedidoDto: UpdateDetallePedidoDto) {
        return this.detallePedidosService.updateDetallePedido(id, updateDetallePedidoDto);
    }   
}