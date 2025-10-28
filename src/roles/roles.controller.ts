import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Rol } from './entities/rol.entity';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRol(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRol(createRoleDto);
  }
  @Get()
  getRoles(): Promise<Rol[]> {
    return this.rolesService.getRoles();
  }
  @Get(':id')
  getRol(@Param('id', ParseIntPipe) id: number): Promise<Rol | null> {
    return this.rolesService.getRol(id);
  }
  @Delete(':id')
  deleteRol(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.deleteRol(id);
  }
  @Put(':id')
  updateRol(@Param('id', ParseIntPipe) id: number, @Body() updateRolDto: UpdateRoleDto) {
    return this.rolesService.updateRol(id, updateRolDto);
  }
 
}
