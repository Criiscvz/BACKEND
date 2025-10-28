import { Controller, Get, Post, Body, Put, ParseIntPipe,Param, Delete } from '@nestjs/common';
import { EstadoService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './entities/estado.entity';

@Controller('estados')
export class EstadosController {
  constructor(private estadoService: EstadoService) {}

  @Post()
  createEstado(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadoService.createEstado(createEstadoDto);
  }
  @Get()
  getEstados(): Promise<Estado[]> {
    return this.estadoService.getEstados();
  }
  @Get(':id')
  getEstado(@Param('id', ParseIntPipe) id: number): Promise<Estado | null> {
    return this.estadoService.getEstado(id);
  }
  @Delete(':id')
  deleteEstado(@Param('id', ParseIntPipe) id: number) {
    return this.estadoService.deleteEstado(id);
  }
  @Put(':id')
  updateEstado(@Param('id', ParseIntPipe) id: number, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadoService.updateEstado(id, updateEstadoDto);
  }
 
}

