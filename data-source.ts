import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Función para validar que todas las variables necesarias estén definidas
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable de entorno ${name} no está definida en .env`);
  }
  return value;
}

// Leer y validar variables de entorno
const DB_TYPE = getEnvVar('DB_TYPE');       
const DB_HOST = getEnvVar('DB_HOST');
const DB_PORT = parseInt(getEnvVar('DB_PORT'), 10);
const DB_USER = getEnvVar('DB_USER');
const DB_PASS = getEnvVar('DB_PASS');
const DB_NAME = getEnvVar('DB_NAME');

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
  type: DB_TYPE as any,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
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
  migrations: [path.join(__dirname, '/src/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true,
});
