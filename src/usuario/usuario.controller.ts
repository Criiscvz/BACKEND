import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('usuario')
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) { }
  
  //crud basico que se usa en panel de admin en el frontend
  //     http://localhost:3000/api/v1/usuario
  
  @Post()
  @Auth(Role.ADMIN)
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  getUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.getUsuarios();
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  getUsuario(@Param('id', ParseIntPipe) id: number): Promise<Usuario | null> {
    return this.usuarioService.getUsuario(id);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  deleteUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.deleteUsuario(id);
  }

  @Put(':id')
  @Auth(Role.ADMIN)
  updateUsuario(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  
  
  
  
  //consultar usuario por correo electronico
  @Get('correo/:correoElectronico')
  getUsuarioByCorreoElectronico(@Param('correoElectronico') correoElectronico: string): Promise<Usuario | null> {
    return this.usuarioService.getUsuarioByCorreoElectronico(correoElectronico);
  }
  
}

