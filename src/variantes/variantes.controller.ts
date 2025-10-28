import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { VariantesService } from './variantes.service';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { Variante } from './entities/variante.entity';

@Controller('variantes')
export class VariantesController {
  constructor(private readonly variantesService: VariantesService) {}

  @Post()
  createVariante(@Body() createVarianteDto: CreateVarianteDto): Promise<Variante> {
    return this.variantesService.createVariante(createVarianteDto);
  }

  @Get()
  getVariantes(): Promise<Variante[]> {
    return this.variantesService.getVariantes();
  }

  @Get(':id')
  getVariante(@Param('id', ParseIntPipe) id: number): Promise<Variante | null> {
    return this.variantesService.getVariante(id);
  }

  @Delete(':id')
  deleteVariante(@Param('id', ParseIntPipe) id: number) {
    return this.variantesService.deleteVariante(id);
  }

  @Put(':id')
  updateVariante(@Param('id', ParseIntPipe) id: number, @Body() updateVarianteDto: UpdateVarianteDto) {
    return this.variantesService.updateVariante(id, updateVarianteDto);
  }
}
