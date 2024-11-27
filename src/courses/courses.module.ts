import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {Course , CoursesSchema} from './courses.schema'
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller"; 

@Module({
    imports: [
        MongooseModule.forFeature([{name: Course.name , schema: CoursesSchema}])
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService] //can be used in progress/adaptive learning?
})

export class CoursesModule {}