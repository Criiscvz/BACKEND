// productos.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductoService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('productos')
export class ProductosController {

  constructor(private productoService: ProductoService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    // --- CONFIGURACIÓN MULTER LOCAL ---
    storage: diskStorage({
      destination: './uploads', // Carpeta donde se guardan (créala en la raíz del proyecto backend)
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `producto-${uniqueSuffix}${ext}`);
      },
    }),
    // ----------------------------------

    // --- FUTURO: CLOUDINARY / GOOGLE CLOUD ---
    // Para Cloudinary, aquí no usarías 'storage: diskStorage'.
    // Usarías 'MemoryStorage' (por defecto si no pones nada) para tener el archivo en buffer
    // y luego en el servicio llamarías a la API de Cloudinary.
    // -----------------------------------------
  }))
  createProducto(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Si se subió un archivo, guardamos la ruta completa
    if (file) {
      // Para local: Construimos la URL
      // En producción, cambia 'http://localhost:3000' por tu dominio real o variables de entorno
      createProductoDto.imagen = `http://localhost:3000/uploads/${file.filename}`;

      // --- AGREGA ESTO: Si no viene fecha, pon la de hoy ---
      if (!createProductoDto.fechaElaboracion) {
        createProductoDto.fechaElaboracion = new Date();
      }

      // Asignar IDs obligatorios si no vienen
      createProductoDto.usuarioCreaId = 1;
      createProductoDto.estadoId = 1;

      // --- FUTURO: CLOUDINARY ---
      // const url = await this.cloudinaryService.uploadImage(file);
      // createProductoDto.imagen = url;
    }

    // Nota: Como viene de FormData, los números pueden llegar como strings.
    // Asegúrate de convertirlos si es necesario, aunque ClassTransform suele ayudar.
    if (createProductoDto.precio) createProductoDto.precio = Number(createProductoDto.precio);
    if (createProductoDto.stock) createProductoDto.stock = Number(createProductoDto.stock);
    if (createProductoDto.estadoId) createProductoDto.estadoId = Number(createProductoDto.estadoId);
    // Asignamos usuario por defecto si no viene (el admin)
    createProductoDto.usuarioCreaId = 1;

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
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `producto-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      updateProductoDto.imagen = `http://localhost:3000/uploads/${file.filename}`;
    }

    // Conversiones de tipos necesarias al venir de FormData
    if (updateProductoDto.precio) updateProductoDto.precio = Number(updateProductoDto.precio);
    if (updateProductoDto.stock) updateProductoDto.stock = Number(updateProductoDto.stock);
    if (updateProductoDto.estadoId) updateProductoDto.estadoId = Number(updateProductoDto.estadoId);

    return this.productoService.updateProducto(id, updateProductoDto);
  }
}