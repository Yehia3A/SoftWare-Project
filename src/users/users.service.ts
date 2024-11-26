import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';  // Importing Response from express

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, ...otherDetails } = createUserDto;

    // Check if the email is already registered
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser =  new this.userModel({ ...otherDetails, email, password_hash });
    return newUser.save();
  }

  // User login with JWT token stored in cookies
  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
  
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found, Please Register first!');
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
      httpOnly: true, // Prevents JS access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use cookies over HTTPS in production
      maxAge: 3600 * 1000, // 1 hour expiration
    });
  
    return res.json({ message: 'Login successful' ,accessToken});
  }

  // Fetch user profile
  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password_hash');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
  

  // Update user profile
  async updateProfile(userId: string, updateUserProfileDto: UpdateUserProfileDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, updateUserProfileDto, { new: true })
      .select('-password_hash');
    if (!updatedUser) {
      throw new UnauthorizedException('User not found');
    }
    return updatedUser;
  }
}
