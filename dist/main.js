"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = 3000;
    await app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map