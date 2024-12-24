import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Modules, ModulesSchema } from './modules.schema';
import { IsCourseIdValidConstraint } from 'src/validators/is-course-id-valid.validator';
import { Course, CourseSchema } from 'src/courses/courses.schema';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema },
      { name: Course.name, schema: CourseSchema }, 
  ]),],
   
  controllers: [ModulesController],
  providers: [ModulesService,],
  exports: [ModulesService, MongooseModule], // Export MongooseModule
})
export class ModulesModule {}