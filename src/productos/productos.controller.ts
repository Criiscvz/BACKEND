import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  createProducto(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productosService.createProducto(createProductoDto);
  }

  @Get()
  getProductos(@Body() createProductoDto: CreateProductoDto): Promise<Producto[]> {
    return this.productosService.getProductos(createProductoDto);
  }

  @Get(':id')
  getProducto(@Param('id', ParseIntPipe) id: number): Promise<Producto | null> {
    return this.productosService.getProducto(id);
  }

  @Delete(':id')
  deleteProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.deleteProducto(id);
  }

  @Patch(':id')
  updateProducto(@Param('id', ParseIntPipe) id: number,@Body() updateProductoDto: UpdateProductoDto,): Promise<Producto> {
    return this.productosService.updateProducto(id, updateProductoDto);
  }
}
