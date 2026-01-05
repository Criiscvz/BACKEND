import { Injectable, NotFoundException } from '@nestjs/common';
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
  async update(id: number, updateProductoDto: UpdateProductoDto) {
    // 1. Buscamos el producto con sus variantes actuales
    const producto = await this.productoRepository.preload({
      productoId: id,
      ...updateProductoDto, // Esto cargará las variantes nuevas si vienen en el DTO
    });

    if (!producto) throw new NotFoundException(`Producto #${id} no encontrado`);

    // 2. Usar .save() es vital, ya que es el que dispara la creación de relaciones nuevas
    return await this.productoRepository.save(producto);
  }
}
