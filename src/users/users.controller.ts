import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  UseGuards,
  Request,
  Res,
  Param,
  Put,
  UploadedFile,
  Delete,
  Query,
} from '@nestjs/common';
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
import { User } from './user.schema';
import { use } from 'passport';

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
    console.log('Decoded User Payload:', req.user); // Debugging: Check the contents of req.user
    return this.usersService.getProfile(req.user._id); // Use the userId from req.user
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.student)
  @Put(':id/student-profile')
  updateStudentProfile(
    @Request() req,
    @Body() updateStudentProfileDto: UpdateStudentProfileDto,
  ) {
    return this.usersService.updateStudentProfile(
      req.user._id,
      updateStudentProfileDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Instructor)
  @Put(':id/instructor-profile')
  updateInstructorProfile(
    @Request() req,
    @Body() updateInstructorProfileDto: UpdateInstructorProfileDto,
  ) {
    return this.usersService.updateInstructorProfile(
      req.user._id,
      updateInstructorProfileDto,
    );
  }
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
    await this.usersService.updateProfilePicture(userId, profilePictureUrl);
    return { profilePictureUrl };
  }
  @Get('/') async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId);
  }
  @Get('search/student')
  async searchStudent(@Query('name') name: string): Promise<User[]> {
    return this.usersService.searchStudentByName(name);
  }
  @Get('search/instructor')
  async searchInstructor(@Query('name') name: string): Promise<User[]> {
    return this.usersService.searchInstructorByName(name);
  }
}
