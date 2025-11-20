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

//Importar todas las entidades
import { Rol } from './roles/entities/rol.entity';
import { Estado } from './estados/entities/estado.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { Direccion } from './direcciones/entities/direccion.entity';
import { Producto } from './productos/entities/producto.entity';
import { Variante } from './variantes/entities/variante.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { DetallePedido } from './pedidos/entities/detalle-pedido.entity';
import { Factura } from './facturas/entities/factura.entity';
import { DetalleFactura } from './facturas/entities/detalle-factura.entity';
import { Devolucion } from './devoluciones/entities/devolucione.entity';
import { Historial } from './historial/entities/historial.entity';



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
        entities: [
          Rol,
          Estado,
          Usuario,
          Direccion,
          Producto,
          Variante,
          Pedido,
          DetallePedido,
          Factura,
          DetalleFactura,
          Devolucion,
          Historial,
        ],
        //esto sirve para que las entidades se sincronicen con la base de datos y no hacer migraciones
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE') === true,
        //esto sirve para ejecutar las migraciones para crear las tablas
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
export class AppModule { }