"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const user_interactions_module_1 = require("./user-interactions/user-interactions.module");
const recommendations_module_1 = require("./recommendations/recommendations.module");
const user_module_1 = require("./users/user.module");
const courses_module_1 = require("./courses/courses.module");
const modules_module_1 = require("./modules/modules.module");
const progress_module_1 = require("./progress/progress.module");
const config_1 = require("@nestjs/config");
const response_module_1 = require("./response/response.module");
const auth_module_1 = require("./auth/auth.module");
const auth_middleware_1 = require("./auth/auth.middleware");
const chat_module_1 = require("./communication/chat/chat.module");
const forum_module_1 = require("./communication/forum/forum.module");
const notification_module_1 = require("./communication/notification/notification.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017'),
            quizzes_module_1.QuizzesModule,
            user_interactions_module_1.UserInteractionsModule,
            recommendations_module_1.RecommendationsModule,
            user_module_1.UsersModule,
            courses_module_1.CoursesModule,
            modules_module_1.ModulesModule,
            progress_module_1.ProgressesModule,
            response_module_1.ResponsesModule,
            chat_module_1.ChatModule,
            forum_module_1.ForumModule,
            notification_module_1.NotificationModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map