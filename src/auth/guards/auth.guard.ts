import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['accessToken'];

    if (!token) {
      console.error("No token found");
      throw new UnauthorizedException('No token found');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Attach the payload to the request object
    } catch (err) {
      console.error("Invalid token:", err.message);
      throw new UnauthorizedException('Invalid token');
    }

    console.log("User:", request.user); // Debug log
    return true;
  }
}
