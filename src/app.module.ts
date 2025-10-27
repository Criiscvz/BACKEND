import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importar todos los módulos
import { RolesModule } from './roles/roles.module';
import { EstadosModule } from './estados/estados.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { ProductosModule } from './productos/productos.module';
import { VariantesModule } from './variantes/variantes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { FacturasModule } from './facturas/facturas.module';
import { DevolucionesModule } from './devoluciones/devoluciones.module';
import { HistorialModule } from './historial/historial.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // o el nombre del contenedor si usas Docker
      port: 5432,
      username: 'postgres',
      password: 'post123',
      database: 'Inovarte',
      autoLoadEntities: true,
      synchronize: false,      // ⚠️ No usar en producción, solo en desarrollo si lo necesitas
      migrations: ['dist/migrations/*.js'],
    }),
    RolesModule,
    EstadosModule,
    UsuarioModule,
    DireccionesModule,
    ProductosModule,
    VariantesModule,
    PedidosModule,
    FacturasModule,
    DevolucionesModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
