import { Module } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historial } from './entities/historial.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Historial])],
  controllers: [HistorialController],
  providers: [HistorialService],
})
export class HistorialModule {}
