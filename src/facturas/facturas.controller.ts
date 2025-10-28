import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';

@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  createFactura(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return this.facturasService.createFactura(createFacturaDto);
  }

  @Get()
  getFacturas(): Promise<Factura[]> {
    return this.facturasService.getFacturas();
  }

  @Get(':id')
  getFactura(@Param('id', ParseIntPipe) id: number): Promise<Factura | null> {
    return this.facturasService.getFactura(id);
  }

  @Delete(':id')
  deleteFactura(@Param('id', ParseIntPipe) id: number) {
    return this.facturasService.deleteFactura(id);
  }

  @Put(':id')
  updateFactura(@Param('id', ParseIntPipe) id: number, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturasService.updateFactura(id, updateFacturaDto);
  }
}
