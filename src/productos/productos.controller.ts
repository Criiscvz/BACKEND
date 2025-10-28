import { Controller, Get, Post, Body, Patch,Put,  Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {

  constructor(private productoService: ProductoService) { }

  @Post()
  createProducto(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.createProducto(createProductoDto);
  }

  @Get()
  getProductos(): Promise<Producto[]> {
    return this.productoService.getProductos();
  }
  @Get(':id')
  getProducto(@Param('id', ParseIntPipe) id: number): Promise<Producto | null> {
    return this.productoService.getProducto(id);
  }
  @Delete(':id')
  deleteProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.deleteProducto(id);
  }
  @Put(':id')
  updateProducto(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.updateProducto(id, updateProductoDto);
  }
  
}
