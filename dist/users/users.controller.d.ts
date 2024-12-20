import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';
import { UpdateInstructorProfileDto } from './dto/update-instructor-profileDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: RegisterUserDto): Promise<import("./user.schema").User>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any): Promise<any>;
    updateStudentProfile(req: any, updateStudentProfileDto: UpdateStudentProfileDto): Promise<import("./user.schema").User>;
    updateInstructorProfile(req: any, updateInstructorProfileDto: UpdateInstructorProfileDto): Promise<import("./user.schema").User>;
    uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<{
        profilePictureUrl: string;
    }>;
}
