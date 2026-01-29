# Innova Arte - Backend API

API RESTful desarrollada con **NestJS** para la plataforma de comercio electrónico "Innova Arte". Este sistema gestiona la lógica de negocio, autenticación y persistencia de datos.

## 🏗 Arquitectura de Despliegue (Importante)

Este backend opera bajo una arquitectura **On-Premise (Servidor Privado)**, simulando un entorno empresarial real.

* **Ubicación:** Servidor Virtualizado (Ubuntu Server LTS 22.04/24.04).
* **Servidor Web:** Nginx configurado como Proxy Inverso con terminación SSL (HTTPS).
* **Base de Datos:** PostgreSQL (Alojada localmente en el mismo servidor).
* **Gestión de Procesos:** PM2 para alta disponibilidad y reinicio automático.
* **Conexión Externa:** Túnel seguro vía **Ngrok** para exponer la API local a la nube.

### Diagrama de Flujo
`Cliente (Frontend/Netlify) -> Ngrok (Internet) -> Nginx (443 SSL) -> NestJS (3000) -> PostgreSQL`

## 🚀 Tecnologías
* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **Base de Datos:** PostgreSQL
* **ORM:** TypeORM
* **Entorno:** Node.js v20 LTS

## ⚙️ Configuración del Entorno (.env)

El proyecto requiere las siguientes variables de entorno:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=estudiante
DB_PASSWORD=****
DB_DATABASE=innovarte_db
PORT=3000
TYPEORM_SYNCHRONIZE=true

# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run start:dev

# 3. Compilar para producción
npm run build

# 4. Ejecutar en producción (con PM2)
pm2 start dist//src/main.js --name "backend"