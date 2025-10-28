import { Module } from '@nestjs/common';
import { DetalleFacturasService } from './detalle-facturas.service';
import { DetalleFacturasController } from './detalle-facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle-factura.entity';


@Module({
    imports: [TypeOrmModule.forFeature([DetalleFactura])],
    controllers: [DetalleFacturasController],
    providers: [DetalleFacturasService]
})
export class DetalleFacturasModule { }
