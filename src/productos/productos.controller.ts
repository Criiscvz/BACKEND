import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './productos.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // <--- IMPORTAR
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {

  // Inyectamos CloudinaryService
  constructor(
    private productoService: ProductoService,
    private cloudinaryService: CloudinaryService 
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file')) // <--- YA NO USAMOS DISKSTORAGE (se guarda en memoria RAM temporalmente)
  async createProducto(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      // AQUÍ OCURRE LA MAGIA: Subimos a Cloudinary y obtenemos la URL
      const result = await this.cloudinaryService.uploadFile(file);
      createProductoDto.imagen = result.secure_url; 
    }

    // Asegurar valores por defecto
    if (!createProductoDto.fechaElaboracion) createProductoDto.fechaElaboracion = new Date();
    createProductoDto.usuarioCreaId = 2;
    createProductoDto.estadoId = 1;
    
    // Conversiones simples
    if (createProductoDto.precio) createProductoDto.precio = Number(createProductoDto.precio);
    if (createProductoDto.stock) createProductoDto.stock = Number(createProductoDto.stock);

    return this.productoService.createProducto(createProductoDto);
  }

  @Get()
  getProductos() {
    return this.productoService.getProductos();
  }

  @Get(':id')
  getProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.getProducto(id);
  }

  @Delete(':id')
  deleteProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.deleteProducto(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      // Si suben nueva imagen, la mandamos a Cloudinary
      const result = await this.cloudinaryService.uploadFile(file);
      updateProductoDto.imagen = result.secure_url;
    }

    // Conversiones
    if (updateProductoDto.precio) updateProductoDto.precio = Number(updateProductoDto.precio);
    if (updateProductoDto.stock) updateProductoDto.stock = Number(updateProductoDto.stock);

    return this.productoService.update(id, updateProductoDto);
  }
}