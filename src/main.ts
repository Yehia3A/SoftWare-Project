import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser'; // Add this import
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { JwtAuthGuard } from './auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use global validation pipe
  app.useGlobalGuards(new JwtAuthGuard(new JwtService({ secret: 'your-secret-key' })));
  app.use(cookieParser()); // Add this line

  // Initialize passport middleware
  app.use(passport.initialize());



  
  await app.listen(3000);
  console.log("server running port 3000")
}
bootstrap();
