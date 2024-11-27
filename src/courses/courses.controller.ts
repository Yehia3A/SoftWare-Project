import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.createCourse(createCourseDto);
    }

    @Get()
    getAllCourses() {
        return this.coursesService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') courseId: string) {
        return this.coursesService.getCourseById(courseId);
    }

    @Put(':id')
    updateCourse(
        @Param('id') courseId: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return this.coursesService.updateCourse(courseId, updateCourseDto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') courseId: string) {
        return this.coursesService.deleteCourse(courseId);
    }
}
