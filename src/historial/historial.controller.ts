import { Controller, Get, Post, Body, Patch,Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { Historial } from './entities/historial.entity';


@Controller('historial')
export class HistorialController {
  constructor(private historialService: HistorialService) {}

  @Post()
  createHistorial(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialService.createHistorial(createHistorialDto);
  }
  @Get()
  getHistoriales(): Promise<Historial[]> {
    return this.historialService.getHistoriales();
  }
  @Get(':id')
  getHistorial(@Param('id', ParseIntPipe) id: number): Promise<Historial | null> {
    return this.historialService.getHistorial(id);
  }
  @Delete(':id')
  deleteHistorial(@Param('id', ParseIntPipe) id: number) {
    return this.historialService.deleteHistorial(id);
  }
  @Put(':id')
  updateHistorial(@Param('id', ParseIntPipe) id: number, @Body() UpdateHistorialDto: UpdateHistorialDto) {
    return this.historialService.updateHistorial(id, UpdateHistorialDto);
  }
 
}
