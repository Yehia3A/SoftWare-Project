import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false; // No Authorization header
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    try {
      const user = this.jwtService.verify(token); // Decode JWT
      request.user = user; // Attach user to request
      return true;
    } catch (error) {
      return false; // Invalid token
    }
  }
}
