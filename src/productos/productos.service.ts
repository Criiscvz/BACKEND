import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Variante } from '../variantes/entities/variante.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {

  constructor(
    @InjectRepository(Producto) private productoRepository: Repository<Producto>,
    @InjectRepository(Variante) private varianteRepository: Repository<Variante>
  ) {}

  createProducto(producto: CreateProductoDto): Promise<Producto> {
    const newProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(newProducto);
  }
  getProductos() {
    return this.productoRepository.find({
      relations: ['variantes'] // <--- AGREGAR ESTO IMPORTANTE
    });
  }

  getProducto(id: number) {
    return this.productoRepository.findOne({ 
      where: { productoId: id },
      relations: ['variantes'] // <--- AGREGAR ESTO TAMBIÉN
    });
  }
  async deleteProducto(id: number) {
    // Verificar si el producto existe
    const producto = await this.productoRepository.findOne({
      where: { productoId: id },
      relations: ['variantes', 'variantes.detallesPedido']
    });

    if (!producto) {
      throw new NotFoundException(`Producto #${id} no encontrado`);
    }

    // Verificar si hay variantes con pedidos asociados
    const tieneVentasActivas = producto.variantes?.some(
      variante => variante.detallesPedido && variante.detallesPedido.length > 0
    );

    if (tieneVentasActivas) {
      throw new BadRequestException(
        'No se puede eliminar el producto porque tiene ventas asociadas. Considera desactivarlo en lugar de eliminarlo.'
      );
    }

    // Eliminar variantes primero
    if (producto.variantes && producto.variantes.length > 0) {
      await this.varianteRepository.remove(producto.variantes);
    }

    // Ahora eliminar el producto
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
