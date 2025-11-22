**Resumen**

- **Proyecto:** Backend API construida con NestJS y TypeORM para gestión de e-commerce (usuarios, roles, productos, pedidos, facturas, devoluciones, direcciones, variantes, estados e historial).

**Stack**

- **Framework:** `NestJS` (TypeScript)
- **ORM:** `TypeORM`
- **Base de datos:** `PostgreSQL`
- **Testing:** `Jest` (e2e)

**Estructura y módulos principales**

- **`auth`**: autenticación y emisión de JWT.
- **`usuario`**, **`roles`**: gestión de usuarios y control de roles/privilegios.
- **`productos`**, **`variantes`**: catálogo de productos y sus variantes.
- **`pedidos`**, **`detalle-pedidos`**: creación y gestión de pedidos.
- **`facturas`**, **`detalle-facturas`**: facturación y detalle de facturas.
- **`devoluciones`**: manejo de devoluciones.
- **`direcciones`**, **`estados`**, **`historial`**: datos relacionados con envíos, estados y logs de cambios.
- **`migrations`**: scripts de migración localizados en `src/migrations`.

**Configuración de la conexión (TypeORM)**

- El archivo `data-source.ts` exporta `AppDataSource` (instancia de TypeORM) y contiene la configuración de conexión y la lista de entidades.
- `app.module.ts` configura `TypeOrmModule.forRoot(...)` para que NestJS use la conexión y permita la inyección de repositorios.
- Mantener un único origen de configuración es recomendable: exportar `dataSourceOptions` y reutilizarlo en `app.module.ts` y en `data-source.ts`.

**Variables de entorno importantes**

- `DB_HOST` — host de PostgreSQL (por defecto `localhost`)
- `DB_PORT` — puerto (por defecto `5432`)
- `DB_USER` — usuario de BD
- `DB_PASS` — contraseña de BD
- `DB_NAME` — nombre de la base de datos
- `JWT_SECRET` — clave para firmar tokens JWT

Ejemplo mínimo de `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=post123
DB_NAME=Inovarte
JWT_SECRET=tu_secret
```

**Comandos útiles (PowerShell)**
```
npm install
npm run build
npm run start:dev
```
**Rutas Login y register**
LOGIN:
Metodo: POST
http://localhost:3000/api/v1/auth/register
{
  "nombre": "usario",
  "apellido": "usario4",
  "telefono": "0995765445",
  "correoElectronico": "admin@gmail.com",
  "contrasenaFriada": "123456",
  "usuarioCreaId": 1
}
REGISTER:
METODO: POST
http://localhost:3000/api/v1/auth/login
{
  "correoElectronico": "admin2@example.com",
  "contrasenaFriada": "admin123"
}
**Rutas protegida usuario con token JWT SOLO ADMIN** 
Para mostrar datos(tiene que estar logueado y poner el token en el auth) metodo GET
http://localhost:3000/api/v1/usuario

Para actualiar rol(tiene que estar logueado y poner el token en el auth) metodo PUT
http://127.0.0.1:3000/api/v1/usuario/5
{
  "rolId": 2
}

**Rutas protegida direccion con token JWT SOLO USER**
Una vez ya iniciado seccion copiara el token y ubicarlo
Metodo POST
http://localhost:3000/api/v1/direcciones
{
  "callePrincipal": "Avenida Los Álamos, Edificio 5",
  "avenida": "Av. Central",
  "ciudad": "Guayaquil",
  "provincia": "Guayas",
  "pais": "Ecuador"
}
Metodo GET consultar todos los registros
http://localhost:3000/api/v1/direcciones

Metodo GET consultar un regrstro en expecifico
http://localhost:3000/api/v1/direcciones/3

Metodo PUT actualizar registro:
http://localhost:3000/api/v1/direcciones/3

{
  "callePrincipal": "Avenida Los Álamos, Edificio 5",
  "avenida": "Av. Central",
  "ciudad": "Manta",
  "provincia": "Guayas",
  "pais": "Ecuador"
}

Metodo DELETE eliminar registro:
http://localhost:3000/api/v1/direcciones/3