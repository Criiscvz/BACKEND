import { Module } from '@nestjs/common';
import { EstadoService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  controllers: [EstadosController],
  providers: [EstadoService],
})
export class EstadosModule {}
