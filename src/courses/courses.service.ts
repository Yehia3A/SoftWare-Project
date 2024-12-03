import { Injectable } from "@nestjs/common";

@Injectable()
<<<<<<< HEAD
export class CoursesService{}
=======
export class CoursesService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

    // Create a new course
    async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
        const newCourse = new this.courseModel(createCourseDto);
        return newCourse.save();
    }

    // Retrieve all courses
    async getAllCourses(): Promise<Course[]> {
        return this.courseModel.find().exec();
    }

    // Retrieve a single course by ID
    async getCourseById(courseId: string): Promise<Course> {
        const course = await this.courseModel.findById(courseId).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID: ${courseId} not found`);
        }
        return course;
    }

    // Update a course
    async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const existingCourse = await this.courseModel.findById(courseId).exec();
        if (!existingCourse) {
            throw new NotFoundException(`Course with ID: ${courseId} not found`);
        }
        const updatedCourse = await this.courseModel
            .findByIdAndUpdate(courseId, updateCourseDto, { new: true })
            .exec();
        return updatedCourse;
    }

    // Delete a course
    async deleteCourse(courseId: string): Promise<{ message: string }> {
        const result = await this.courseModel.findByIdAndDelete(courseId).exec();
        if (!result) {
            throw new NotFoundException(`Course with ID: ${courseId} not found`);
        }
        return { message: `Course with ID: ${courseId} successfully deleted` };
    }
}
>>>>>>> 2390a8ead770db3d57cf8bb675a3eb4376aec2c3
