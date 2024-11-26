import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProfile(req: any, updateUserProfileDto: UpdateUserProfileDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument> & import("./user.schema").User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
