//esta importacion es para validaciones futuras
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prefijo global para la version de la API
  app.setGlobalPrefix('api/v1');

  
  //configuracion de cors para permitir solicitudes desde el frontend
  //los cors son politicas de seguridad que restringen las solicitudes HTTP entre diferentes dominios
  //app.enableCors(); //habilita cors para cualquier origen (no recomendado en produccion)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  });

  //configuracion global de pipes para validaciones
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //puerto de escucha del servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
