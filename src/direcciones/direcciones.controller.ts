import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';
import { Direccion } from './entities/direccion.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('direcciones')
export class DireccionesController {

  constructor(private direccionesService: DireccionesService) {}

  @Post()
  @Auth(Role.USER)
  createDireccion(@Body() createDireccionDto: CreateDireccionDto): Promise<Direccion> {
    return this.direccionesService.createDireccion(createDireccionDto);
  }

  @Get()
  @Auth(Role.USER)
  getDirecciones(): Promise<Direccion[]> {
    return this.direccionesService.getDirecciones();
  }

  @Get(':id')
  @Auth(Role.USER)
  getDireccion(@Param('id', ParseIntPipe) id: number): Promise<Direccion | null> {
    return this.direccionesService.getDireccion(id);
  }

  @Delete(':id')
  @Auth(Role.USER)
  deleteDireccion(@Param('id', ParseIntPipe) id: number) {
    return this.direccionesService.deleteDireccion(id);
  }

  @Put(':id')
  @Auth(Role.USER)
  updateDireccion(@Param('id', ParseIntPipe) id: number, @Body() updateDireccionDto: UpdateDireccionDto) {
    return this.direccionesService.updateDireccion(id, updateDireccionDto);
  }

}
