import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { Response, ResponseDocument } from '../response/response.schema';


@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}
  
  async deleteQuiz(quizId: string): Promise<{ message: string }> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    await this.quizModel.findByIdAndDelete(quizId);
    return { message: `Quiz with ID ${quizId} has been deleted successfully.` };
  }

  // Create a new quiz
  async createQuiz(moduleId: string, questions: any[]): Promise<Quiz> {
    const newQuiz = new this.quizModel({
      moduleId,
      questions,
    });
    return newQuiz.save();
  }

  // Fetch a quiz by its ID
  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  // Submit quiz response and calculate score
  async submitResponse(
    userId: string,
    quizId: string,
    answers: { questionId: string; answer: string }[],
  ): Promise<any> {
    const quiz = await this.getQuizById(quizId);
    let score = 0;

    const evaluatedAnswers = answers.map((userAnswer) => {
      const question = quiz.questions.find(
        (q: any) => q._id.toString() === userAnswer.questionId,
      );
      const isCorrect = question.correctAnswer === userAnswer.answer;

      if (isCorrect) score++;

      return {
        questionId: userAnswer.questionId,
        isCorrect,
        correctAnswer: question.correctAnswer,
      };
    });

    // Save response
    const newResponse = new this.responseModel({
      userId,
      quizId,
      answers: evaluatedAnswers,
      score,
    });
    await newResponse.save();

    return {
      score,
      totalQuestions: quiz.questions.length,
      evaluatedAnswers,
    };
  }

  // Adaptive difficulty logic
  determineNextQuestion(
    quiz: QuizDocument,
    currentQuestionId: string,
  ): any | null {
    const currentIndex = quiz.questions.findIndex(
      (q: any) => q._id.toString() === currentQuestionId,
    );

    return quiz.questions[currentIndex + 1] || null;
  }
}
