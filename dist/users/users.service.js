"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async getAllUsers() {
        return this.userModel.find();
    }
    async register(createUserDto) {
        const { email, password, ...otherDetails } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        if (!password) {
            throw new common_1.InternalServerErrorException('Password is required');
        }
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const newUser = new this.userModel({
            ...otherDetails,
            email,
            password_hash,
        });
        return newUser.save();
    }
    async login(loginUserDto, res) {
        const { email, password } = loginUserDto;
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found, please register first!');
            }
            const passwordMatches = await bcrypt.compare(password, user.password_hash);
            if (!passwordMatches) {
                throw new common_1.UnauthorizedException('Email or password is incorrect!');
            }
            const payload = { _id: user._id, role: user.role };
            const accessToken = this.jwtService.sign(payload);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600 * 1000,
            });
            return res.json({
                message: 'Login successful',
                accessToken,
                role: user.role,
            });
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            else {
                console.error('Unexpected error during login:', error);
                throw new common_1.InternalServerErrorException('An unexpected error occurred during login.');
            }
        }
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).select('-password_hash');
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        let profile = {
            email: user.email,
            role: user.role,
            name: user.name,
            profilePictureUrl: user.profilePictureUrl,
        };
        if (user.role === 'student') {
            profile.learningPreferences = user.learningPreferences;
            profile.subjectsOfInterest = user.subjectsOfInterest;
        }
        else if (user.role === 'instructor') {
            profile.expertise = user.expertise;
            profile.teachingInterests = user.teachingInterests;
        }
        return profile;
    }
    async updateStudentProfile(userId, updateStudentProfileDto) {
        try {
            return await this.userModel
                .findByIdAndUpdate(userId, updateStudentProfileDto, { new: true })
                .exec();
        }
        catch (error) {
            console.error('Error updating student profile:', error);
            throw new Error('Failed to update student profile');
        }
    }
    async updateInstructorProfile(userId, updateInstructorProfileDto) {
        try {
            const updatedUser = await this.userModel
                .findByIdAndUpdate(userId, updateInstructorProfileDto, { new: true })
                .exec();
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            console.error(`Error updating instructor profile for userId ${userId}:`, error.message);
            throw new Error('Failed to update instructor profile');
        }
    }
    async updateProfilePicture(userId, profilePictureUrl) {
        try {
            await this.userModel
                .findByIdAndUpdate(userId, { profilePictureUrl })
                .exec();
        }
        catch (error) {
            console.error(`Error updating profile picture for userId ${userId}:`, error.message);
            throw new Error('Failed to update profile picture');
        }
    }
    async deleteUser(userId) {
        if (!userId) {
            throw new common_1.BadRequestException('User ID is required');
        }
        return this.userModel.findByIdAndDelete(userId);
    }
    async searchStudentByName(name) {
        const filter = {
            role: 'student',
            name: { $regex: name || '', $options: 'i' },
        };
        return this.userModel.find(filter).exec();
    }
    async searchInstructorByName(name) {
        const filter = {
            role: 'instructor',
            name: { $regex: name || '', $options: 'i' },
        };
        return this.userModel.find(filter).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map