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
import { AuthModule } from './auth/auth.module';
import { DetallePedidosModule } from './pedidos/detalle-pedidos.module';
import { DetalleFacturasModule } from './facturas/detalle-facturas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') === true,
        migrations: ['dist/migrations/*.js'],
      }),
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
    AuthModule,
    DetallePedidosModule,
    DetalleFacturasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}