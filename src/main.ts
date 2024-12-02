import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser'; // Add this import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());
  
  app.use(cookieParser()); // Add this line

  // Initialize passport middleware
  app.use(passport.initialize());



  
  await app.listen(3000);
  console.log("server running port 3000")
}
bootstrap();
