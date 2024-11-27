/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap(); */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting the NestJS application...');
  const app = await NestFactory.create(AppModule);

  console.log('Application initialized. Starting server...');
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
