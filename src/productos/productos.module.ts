import { Module } from '@nestjs/common';
import { ProductoService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';  
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // <--- IMPORTAR

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    CloudinaryModule // <--- AGREGAR AQUÍ
  ],
  controllers: [ProductosController],
  providers: [ProductoService],
})
export class ProductosModule {}