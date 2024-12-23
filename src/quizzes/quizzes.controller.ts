import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/dto/RoleDto';

@Controller('quizzes')
@UseGuards(RolesGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Create a quiz (Only for instructors)
 
   
   @Post('create')
   createQuiz(@Body() CreateQuizDto: CreateQuizDto) {
     return this.quizzesService.createQuiz(CreateQuizDto);
   }

  // Get all quizzes (For general access)
  @Get()
  getAllQuizzes() {
    return this.quizzesService.getAllQuizzes();
  }

  // Get a specific quiz by ID
  @Get(':id')
  getQuizById(@Param('id') quizId: string) {
    return this.quizzesService.getQuizById(quizId);
  }

  // Update a quiz (Only for instructors)
 
  @Put(':id')
  updateQuiz(
    @Param('id') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.updateQuiz(quizId, updateQuizDto);
  }

  
  @Delete(':id')
  deleteQuiz(@Param('id') quizId: string) {
    return this.quizzesService.deleteQuiz(quizId);
  }

  // Submit answers to a quiz (For students)
  @Post('submit')
  submitAnswers(@Body() submitAnswerDto: SubmitAnswerDto) {
    return this.quizzesService.submitAnswers(submitAnswerDto);
  }
}
