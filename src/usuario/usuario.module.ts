import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import {Rol} from '../roles/entities/rol.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Direccion } from 'src/direcciones/entities/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Pedido, Direccion])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
