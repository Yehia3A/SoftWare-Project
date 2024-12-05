import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/RegisterUserDto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    return this.authService.register(registerUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() signInDto: { email: string; password: string },
    @Res({ passthrough: true }) response: Response
  ): Promise<{ access_token: string; payload: { _id: string; email: string; role: string } }> {
    const { access_token, payload } = await this.authService.signIn(signInDto.email, signInDto.password);
    
    // Set the access token as a cookie
    response.cookie('accessToken', access_token, { httpOnly: true });

    return { access_token, payload };
  }
}
