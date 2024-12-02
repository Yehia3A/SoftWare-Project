import { Controller, Post, Body, Get, Patch, UseGuards, Request, Res, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/dto/RoleDto';
import { UpdateInstructorProfileDto } from './dto/update-instructor-profileDto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    return await this.usersService.login(loginUserDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log(req.user); // Check the contents of req.user to verify it's being populated
    return this.usersService.getProfile(req.user._id); // Use the _id from req.user
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.student)
  @Put(':id/student-profile')
  updateStudentProfile(@Param('id') userId: string, @Body() updateStudentProfileDto: UpdateStudentProfileDto) {
    return this.usersService.updateStudentProfile(userId, updateStudentProfileDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Put(':id/instructor-profile')
  updateInstructorProfile(@Param('id') userId: string, @Body() updateInstructorProfileDto: UpdateInstructorProfileDto) {
    return this.usersService.updateInstructorProfile(userId, updateInstructorProfileDto);
  }
}
