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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const RegisterUserDto_1 = require("./dto/RegisterUserDto");
const update_student_profile_dto_1 = require("./dto/update-student-profile.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const RoleDto_1 = require("../auth/dto/RoleDto");
const update_instructor_profileDto_1 = require("./dto/update-instructor-profileDto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(createUserDto) {
        return this.usersService.register(createUserDto);
    }
    async login(loginUserDto, res) {
        return await this.usersService.login(loginUserDto, res);
    }
    async getProfile(req) {
        console.log('Decoded User Payload:', req.user);
        return this.usersService.getProfile(req.user._id);
    }
    updateStudentProfile(req, updateStudentProfileDto) {
        return this.usersService.updateStudentProfile(req.user._id, updateStudentProfileDto);
    }
    updateInstructorProfile(req, updateInstructorProfileDto) {
        return this.usersService.updateInstructorProfile(req.user._id, updateInstructorProfileDto);
    }
    async uploadProfilePicture(userId, file) {
        const profilePictureUrl = `/uploads/profile-pictures/${file.filename}`;
        await this.usersService.updateProfilePicture(userId, profilePictureUrl);
        return { profilePictureUrl };
    }
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
    async deleteUser(userId) {
        return this.usersService.deleteUser(userId);
    }
    async searchStudent(name) {
        return this.usersService.searchStudentByName(name);
    }
    async searchInstructor(name) {
        return this.usersService.searchInstructorByName(name);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterUserDto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RoleDto_1.Role.student),
    (0, common_1.Put)(':id/student-profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_student_profile_dto_1.UpdateStudentProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateStudentProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(RoleDto_1.Role.Instructor),
    (0, common_1.Put)(':id/instructor-profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_instructor_profileDto_1.UpdateInstructorProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateInstructorProfile", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('search/student'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchStudent", null);
__decorate([
    (0, common_1.Get)('search/instructor'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchInstructor", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map