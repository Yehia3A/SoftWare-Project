import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {Course , CoursesSchema} from './courses.schema'
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller"; 

@Module({
<<<<<<< HEAD
    imports: [
        MongooseModule.forFeature([{name: Course.name , schema: CoursesSchema}])
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService] //can be used in progress/adaptive learning?
})

export class CoursesModule {}
=======
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
>>>>>>> 2390a8ead770db3d57cf8bb675a3eb4376aec2c3
