import { Module } from '@nestjs/common';
import { ProductoService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Variante } from '../variantes/entities/variante.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Variante]),
    CloudinaryModule
  ],
  controllers: [ProductosController],
  providers: [ProductoService],
})
export class ProductosModule {}