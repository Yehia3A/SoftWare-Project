import { Controller, Post, Body, Get, Patch, UseGuards, Request, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard'; // Import JwtAuthGuard
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';  // Import Response from express

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  // Login a user and generate a JWT token, storing it in the cookie
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    // Pass Response object to set the cookie
    return await this.usersService.login(loginUserDto, res);
  }

  // Use JwtAuthGuard to protect the profile routes
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log(req.user); // Check the contents of req.user to verify it's being populated
    return this.usersService.getProfile(req.user._id); // Use the _id from req.user
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user._id, updateUserProfileDto); // Use the _id from req.user
  }
}
