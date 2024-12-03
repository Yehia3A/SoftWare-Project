"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const passport = require("passport");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
<<<<<<< HEAD
    await app.listen(process.env.PORT ?? 3000);
=======
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.use(passport.initialize());
    await app.listen(3000);
    console.log("server running port 3000");
>>>>>>> 2390a8ead770db3d57cf8bb675a3eb4376aec2c3
}
bootstrap();
//# sourceMappingURL=main.js.map