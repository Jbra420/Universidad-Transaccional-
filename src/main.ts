import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación global de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // ignora campos extra en el body
      forbidNonWhitelisted: true,// retorna 400 si hay campos no declarados
      transform: true,           // convierte tipos automáticamente (string → number)
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✓ Servidor corriendo en http://localhost:${port}`);
}

bootstrap();
