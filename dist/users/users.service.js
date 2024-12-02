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
        const newUser = new this.userModel({ ...otherDetails, email, password_hash });
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
            return res.json({ message: 'Login successful', accessToken });
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
        return user;
    }
    async updateProfile(userId, updateUserProfileDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userId, updateUserProfileDto, { new: true })
            .select('-password_hash');
        if (!updatedUser) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return updatedUser;
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