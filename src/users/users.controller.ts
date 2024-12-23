import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Param,
  Put,
  UploadedFile,
  Delete,
  Query,
  BadRequestException,
  Req,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { UpdateInstructorProfileDto } from './dto/update-instructor-profileDto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/dto/RoleDto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from './user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${req.params.id}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
    }

    const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
    await this.usersService.updateProfilePicture(id, profilePictureUrl);
    return { profilePictureUrl };
  }

  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteUser(@Req() req): Promise<User> {
    const userId = req.user._id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
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
