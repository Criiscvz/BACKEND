import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './entities/estado.entity';

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  createEstado(@Body() createEstadoDto: CreateEstadoDto): Promise<Estado> {
    return this.estadosService.createEstado(createEstadoDto);
  }

  @Get()
  getEstados(@Body() createEstadoDto: CreateEstadoDto): Promise<Estado[]> {
    return this.estadosService.getEstados(createEstadoDto);
  }

  @Get(':id')
  getEstado(@Param('id') id: number): Promise<Estado | null> {
    return this.estadosService.getEstado(id);
  }

  @Delete(':id')
  deleteEstado(@Param('id') id: number) {
    return this.estadosService.deleteEstado(id);
  }

  @Patch(':id')
  updateEstado(@Param('id') id: number, @Body() updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    return this.estadosService.updateEstado(id, updateEstadoDto);
  }
}
