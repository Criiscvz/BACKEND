import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { DetalleFacturasService } from './detalle-facturas.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';
import { DetalleFactura } from './entities/detalle-factura.entity';

@Controller('detalle-facturas')
export class DetalleFacturasController {
    constructor(private detalleFacturasService: DetalleFacturasService) { }

    @Post()
    createDetalleFactura(@Body() createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
        return this.detalleFacturasService.createDetalleFactura(createDetalleFacturaDto);
    }

    @Get()
    getDetalleFacturas(): Promise<DetalleFactura[]> {
        return this.detalleFacturasService.getDetalleFacturas();
    }

    @Get(':id')
    getDetalleFactura(@Param('id', ParseIntPipe) id: number): Promise<DetalleFactura | null> {
        return this.detalleFacturasService.getDetalleFactura(id);
    }

    @Delete(':id')
    deleteDetalleFactura(@Param('id', ParseIntPipe) id: number) {
        return this.detalleFacturasService.deleteDetalleFactura(id);
    }

    @Put(':id')
    updateDetalleFactura(@Param('id', ParseIntPipe) id: number, @Body() updateDetalleFacturaDto: UpdateDetalleFacturaDto) {
        return this.detalleFacturasService.updateDetalleFactura(id, updateDetalleFacturaDto);
    }
}