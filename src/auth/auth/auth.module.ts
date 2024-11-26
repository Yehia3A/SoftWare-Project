import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/user.module'; // Assuming UsersModule is in the correct path
import { JwtStrategy } from './jwt.strategy'; // Assuming JwtStrategy is correctly defined in the project

@Module({
  imports: [
    PassportModule,  // PassportModule is needed for Passport-based authentication
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',  // Use an environment variable for the secret key
      signOptions: { expiresIn: '12h' }, // Set the JWT expiration time
    }),
    forwardRef(() => UsersModule),  // Use forwardRef to handle circular dependencies between AuthModule and UsersModule
  ],
  providers: [JwtStrategy],  // JwtStrategy is the provider for verifying JWT tokens
  exports: [JwtStrategy],  // Export JwtStrategy to be used in other modules
})
export class AuthModule {}
