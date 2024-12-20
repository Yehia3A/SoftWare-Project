import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/RegisterUserDto';
import { UserDocument } from 'src/users/user.schema'; // Updated import

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto): Promise<string> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: RegisterUserDto = { ...user, password: hashedPassword };
    await this.usersService.register(newUser);
    return 'Registered successfully';
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    payload: { _id: string; email: string; role: string };
  }> {
    const user: UserDocument = (await this.usersService.findByEmail(
      email,
    )) as UserDocument;
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    console.log('Payload:', payload); // Logging the payload for debugging

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'yourSecretKey',
      }),
      payload,
    };
  }
}
