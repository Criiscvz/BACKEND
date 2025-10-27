import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) { }
  
  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }

  @Get()
  getUsuarios(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario[]> {
    return this.usuarioService.getUsuarios(createUsuarioDto);
  }
  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number): Promise<Usuario | null> {
    return this.usuarioService.getUsuario(id);
  }
  @Delete(':id')
  deleteUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.deleteUsuario(id);
  }

}

