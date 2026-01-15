import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

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

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
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
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
