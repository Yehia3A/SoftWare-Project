import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser'; // Add this import
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';

import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Your Next.js frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies)
  });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cookieParser());
  app.use(passport.initialize());

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const port = 3004;
  await app.listen(port);

  console.log(`Server running at http://localhost:${port}`);
}
bootstrap();
