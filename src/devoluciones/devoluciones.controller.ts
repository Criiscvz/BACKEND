import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { DevolucionesService } from './devoluciones.service';
import { CreateDevolucioneDto } from './dto/create-devolucione.dto';
import { UpdateDevolucioneDto } from './dto/update-devolucione.dto';
import { Devolucion } from './entities/devolucione.entity';

@Controller('devoluciones')
export class DevolucionesController {

  constructor(private devolucionesService: DevolucionesService) {}

  @Post() 
  createDevolucion(@Body() createDevolucioneDto: CreateDevolucioneDto): Promise<Devolucion> {
    return this.devolucionesService.createDevolucion(createDevolucioneDto);
  }

  @Get()
  getDevoluciones(): Promise<Devolucion[]> {
    return this.devolucionesService.getDevoluciones();
  }

  @Get(':id')
  getDevolucion(@Param('id', ParseIntPipe) id: number): Promise<Devolucion | null> {
    return this.devolucionesService.getDevolucion(id);
  }

  @Delete(':id')
  deleteDevolucion(@Param('id', ParseIntPipe) id: number) {
    return this.devolucionesService.deleteDevolucion(id);
  }

  @Put(':id')
  updateDevolucion(@Param('id', ParseIntPipe) id: number, @Body() updateDevolucioneDto: UpdateDevolucioneDto) {
    return this.devolucionesService.updateDevolucion(id, updateDevolucioneDto);
  }
}
