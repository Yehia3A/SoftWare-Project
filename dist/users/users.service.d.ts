import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(createUserDto: RegisterUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProfile(userId: string, updateUserProfileDto: UpdateUserProfileDto): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
