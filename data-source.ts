import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Importar todas las entidades
import { Rol } from './src/roles/entities/rol.entity';
import { Estado } from './src/estados/entities/estado.entity';
import { Usuario } from './src/usuario/entities/usuario.entity';
import { Direccion } from './src/direcciones/entities/direccion.entity';
import { Producto } from './src/productos/entities/producto.entity';
import { Variante } from './src/variantes/entities/variante.entity';
import { Pedido } from './src/pedidos/entities/pedido.entity';
import { DetallePedido } from './src/pedidos/entities/detalle-pedido.entity';
import { Factura } from './src/facturas/entities/factura.entity';
import { DetalleFactura } from './src/facturas/entities/detalle-factura.entity';
import { Devolucion } from './src/devoluciones/entities/devolucione.entity';
import { Historial } from './src/historial/entities/historial.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? '123',
  database: process.env.DB_NAME ?? 'Inovarte',
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
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});