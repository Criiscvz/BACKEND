import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Factura } from './entities/factura.entity';
import { DetalleFactura } from './entities/detalle-factura.entity';

@Module({
imports: [TypeOrmModule.forFeature([Factura, DetalleFactura, Pedido])],
controllers: [FacturasController],
providers: [FacturasService],

})
export class FacturasModule {}
