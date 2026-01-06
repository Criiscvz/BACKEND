import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Variante } from 'src/variantes/entities/variante.entity';

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
  async deleteProducto(id: number) {
    // 1. Buscamos el producto con sus variantes cargadas (eager: true ayuda aquí)
    const producto = await this.productoRepository.findOne({ 
      where: { productoId: id } 
    });

    if (!producto) throw new NotFoundException(`Producto #${id} no encontrado`);

    // 2. Usar .remove() es más seguro para asegurar la eliminación en cadena
    return await this.productoRepository.remove(producto);
  }
  async update(id: number, updateProductoDto: UpdateProductoDto) {
      // 1. Buscamos el producto cargando sus variantes actuales de la DB
      const productoExistente = await this.productoRepository.findOne({
          where: { productoId: id },
          relations: ['variantes'] 
      });

      if (!productoExistente) {
          throw new NotFoundException(`Producto #${id} no encontrado`);
      }

      const { variantes, ...datosProducto } = updateProductoDto;

      // 2. BORRADO MANUAL: Identificar variantes que ya no están en el nuevo DTO
      if (variantes) {
          const idsNuevos = variantes
              .filter(v => v.varianteId)
              .map(v => Number(v.varianteId));

          const variantesABorrar = productoExistente.variantes.filter(
              v => !idsNuevos.includes(v.varianteId)
          );

          // Borramos de la DB las que se quitaron en el frontend
          if (variantesABorrar.length > 0) {
              await this.productoRepository.manager.remove(variantesABorrar);
          }
      }

      // 3. Mezclamos los datos básicos (nombre, precio, etc.)
      this.productoRepository.merge(productoExistente, datosProducto);

      // 4. SINCRONIZACIÓN: Actualizar las existentes y crear las nuevas
      if (variantes) {
          productoExistente.variantes = variantes.map(vDto => {
              if (vDto.varianteId) {
                  // Si ya existe, buscamos la original para no perder datos
                  const existente = productoExistente.variantes.find(
                      v => v.varianteId === Number(vDto.varianteId)
                  );
                  return this.productoRepository.manager.merge(Variante, existente || new Variante(), {
                      ...vDto,
                      productoId: id // Clave para evitar el error de "producto_id viola restricción no nulo"
                  });
              }
              // Si es nueva, la creamos vinculada al producto actual
              return this.productoRepository.manager.create(Variante, {
                  ...vDto,
                  productoId: id
              });
          });
      }

      // 5. Guardar el producto final
      return await this.productoRepository.save(productoExistente);
  }
}
