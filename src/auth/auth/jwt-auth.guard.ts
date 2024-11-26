// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Get token from "Authorization" header

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      // Verify the token and decode it
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded; // Attach the decoded user info to the request object
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }

    // Proceed with the default behavior after adding the user to the request
    return super.canActivate(context) as Promise<boolean>;
  }
}
