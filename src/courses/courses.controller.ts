import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/dto/RoleDto';

@Controller('courses')
@UseGuards(RolesGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }
    @Roles(Role.Instructor)
    @Post('create-course')
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.createCourse(createCourseDto);
    }

    @Get()
    getAllCourses() {
        return this.coursesService.getAllCourses();
    }

    @Get('name')
    getCourseById(@Param('id') courseId: string) {
        return this.coursesService.getCourseById(courseId);
    }

    @Roles(Role.Instructor)
    @Put('name')
    updateCourse(
        @Param('name') courseId: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return this.coursesService.updateCourse(courseId, updateCourseDto);
    }

    @Roles(Role.Instructor)
    @Delete('name')
    deleteCourse(@Param('id') courseId: string) {
        return this.coursesService.deleteCourse(courseId);
    }
}
