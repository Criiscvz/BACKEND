import { Module } from '@nestjs/common';
import { DevolucionesService } from './devoluciones.service';
import { DevolucionesController } from './devoluciones.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Devolucion} from "./entities/devolucione.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Devolucion])],
  controllers: [DevolucionesController],
  providers: [DevolucionesService],
})
export class DevolucionesModule {}
