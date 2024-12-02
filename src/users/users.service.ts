import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UpdateInstructorProfileDto } from './dto/update-instructor-profileDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async register(createUserDto: RegisterUserDto): Promise<User> {
    const { email, password, ...otherDetails } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }
    if (!password) {
      throw new InternalServerErrorException('Password is required');
    }
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel({ ...otherDetails, email, password_hash });
    return newUser.save();
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('User not found, please register first!');
      }

      const passwordMatches = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatches) {
        throw new UnauthorizedException('Email or password is incorrect!');
      }

      // Generate JWT token
      const payload = { _id: user._id, role: user.role };
      const accessToken = this.jwtService.sign(payload);

      // Set JWT token in the cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000,
      });

      return res.json({ message: 'Login successful', accessToken });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        console.error('Unexpected error during login:', error);
        throw new InternalServerErrorException('An unexpected error occurred during login.');
      }
    }
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password_hash');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
  async updateStudentProfile(userId: string, updateStudentProfileDto: UpdateStudentProfileDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, updateStudentProfileDto, { new: true }).exec();
    } catch (error) {
      console.error("Error updating student profile:", error);
      // Handle the error appropriately, e.g., throw a custom error or return a default value
      throw new Error("Failed to update student profile");
    }
  }
  
  async updateInstructorProfile(userId: string, updateInstructorProfileDto: UpdateInstructorProfileDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateInstructorProfileDto, { new: true }).exec();
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.error(`Error updating instructor profile for userId ${userId}:`, error.message);
      throw new Error('Failed to update instructor profile');
    }
  }
  
}
