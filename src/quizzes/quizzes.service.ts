import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';


@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  
  ) {}
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz =  new this.quizModel(createQuizDto);
    return  quiz.save();
  }
  async deleteQuiz(quizId: string) {
    return await this.quizModel.findByIdAndDelete(quizId).exec();
  }
  
  async getAllQuizzes() {
    return await this.quizModel.find().exec();
  }
  async getQuizById(quizId: string) {
    return await this.quizModel.findById(quizId).exec();
  }
  async updateQuiz(quizId: string, updateQuizDto: UpdateQuizDto) {
    return await this.quizModel.findByIdAndUpdate(quizId, updateQuizDto, {
      new: true,
    });
  }
  async submitAnswers(submitAnswerDto: SubmitAnswerDto) {
    const { quiz_id, answers } = submitAnswerDto;
  
    const quiz = await this.quizModel.findById(quiz_id).exec();
    if (!quiz) throw new NotFoundException('Quiz not found');
  
    let score = 0;
    const feedback = answers.map((answer) => {
      const question = quiz.questions.find(
        (q) => q.question_id === answer.question_id,
      );
      const isCorrect = question.correctAnswer === answer.answer;
      if (isCorrect) score++;
      return {
        question_id: answer.question_id,
        isCorrect,
        correctAnswer: question.correctAnswer,
      };
    });
  
    return { score, feedback };
  }
  
  
}