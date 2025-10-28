//esta importacion es para validaciones futuras
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //prefijo global para la version de la API
  app.setGlobalPrefix('api/v1');

  //configuracion global de pipes para validaciones
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
}));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
