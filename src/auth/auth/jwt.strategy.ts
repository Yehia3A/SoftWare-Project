import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';// Import the JwtPayload interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'your-secert-key',
    });
  }

  // Ensure the payload is of type JwtPayload
  async validate(payload: JwtPayload) {
    // Log the payload to verify it
    console.log(payload); // Check if sub (userId) is present

    // Return user info to be attached to the request
    return { userId: payload._id, role: payload.role };
  }
}
