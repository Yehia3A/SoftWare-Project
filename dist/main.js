"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
const auth_guard_1 = require("./auth/guards/auth.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new auth_guard_1.JwtAuthGuard(new jwt_service_1.JwtService({ secret: 'your-secret-key' })));
    app.use(cookieParser());
    app.use(passport.initialize());
    await app.listen(3000);
    console.log("server running port 3000");
}
bootstrap();
//# sourceMappingURL=main.js.map