import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema'; // Adjust path as needed
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/user-login.dto'; // Adjust path to your DTO

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService, // Inject JwtService to create JWT tokens
  ) {}

  // Login logic to validate user credentials and generate JWT token
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    
    // Check if the user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Compare the hashed password
    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate a JWT token
    const payload = { _id: user._id, role: user.role }; // Payload includes user id and role
    const accessToken = this.jwtService.sign(payload);

    return { accessToken }; // Return the JWT token
  }
}
 