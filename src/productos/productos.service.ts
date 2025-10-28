import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {

  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>) {}

  createProducto(producto: CreateProductoDto): Promise<Producto> {
    const newProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(newProducto);
  }
  getProductos() {
   return this.productoRepository.find();
  }
  getProducto(id: number) {
    return this.productoRepository.findOne({ 
      where: { productoId: id }
    });
  }
  deleteProducto(id: number) {
   return this.productoRepository.delete({ productoId: id });
  }
  updateProducto(id: number, updateProductoDto: UpdateProductoDto) {
    return this.productoRepository.update({ productoId: id }, updateProductoDto);
  }
}
