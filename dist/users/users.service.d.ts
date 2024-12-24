import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UpdateInstructorProfileDto } from './dto/update-instructor-profileDto';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    register(createUserDto: RegisterUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(userId: string): Promise<any>;
    updateStudentProfile(userId: string, updateStudentProfileDto: UpdateStudentProfileDto): Promise<User>;
    updateInstructorProfile(userId: string, updateInstructorProfileDto: UpdateInstructorProfileDto): Promise<User>;
    updateProfilePicture(userId: string, profilePictureUrl: string): Promise<void>;
    deleteUser(userId: string): Promise<User>;
    searchStudentByName(name: string): Promise<User[]>;
    searchInstructorByName(name: string): Promise<User[]>;
}
