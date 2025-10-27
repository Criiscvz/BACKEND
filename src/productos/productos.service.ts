import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {

  constructor(@InjectRepository(Producto)private productosRepository: Repository<Producto>,) {}

  createProducto(producto: CreateProductoDto): Promise<Producto> {
    const newProducto = this.productosRepository.create(producto);  
    return this.productosRepository.save(newProducto);
  }

  getProductos(producto: CreateProductoDto): Promise<Producto[]> {
   return this.productosRepository.find();
  }

  getProducto(id: number){
    return this.productosRepository.findOne({ 
      where: { productoId: id }
    });
  }

  deleteProducto(id: number) {
   return this.productosRepository.delete({ productoId: id });
  }

  updateProducto(id: number, producto: UpdateProductoDto): Promise<Producto> {
    return this.productosRepository.save({ ...producto, productoId: id });
  }
}
