import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/dto/RoleDto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Roles(Role.Instructor)
  @Post('create-course')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }
  @Get('categories') async getCategories() {
    return this.coursesService.getCategories();
  }
  @Get()
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @Get('search')
  getCourseByName(@Query('title') courseName: string) {
    return this.coursesService.getCourseByName(courseName);
  }

  @Get(':id')
  getCourseById(@Param('id') courseId: string) {
    return this.coursesService.getCourseById(courseId);
  }

  @Roles(Role.Instructor)
  @Put(':name')
  updateCourse(
    @Param('name') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  @Roles(Role.Instructor)
  @Delete(':name')
  deleteCourse(@Param('id') courseId: string) {
    return this.coursesService.deleteCourse(courseId);
  }
}
