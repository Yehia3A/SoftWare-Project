import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: 'yourSecretKey',
      });
      request.user = payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    console.log('User Payload:', request.user); // Debug log
    return true;
  }
}
