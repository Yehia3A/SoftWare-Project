import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { Quiz  } from './quizzes.schema';
import { Response } from '../response/response.schema';

import { Model, Types } from 'mongoose';
import { Quizzes, QuizzesDocument } from './quizzes.schema';
import { SubmitAnswerDto } from './dto/submit-answer.dto';


@Injectable()
export class QuizzesService {
  constructor(

    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(Response.name) private responseModel: Model<Response>,
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
drfrf
  // Fetch a quiz by its ID
  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();

    @InjectModel(Quizzes.name) private quizzesModel: Model<QuizzesDocument>,
  ) {}

  async startQuiz(moduleId: string) {
    const quiz = await this.quizzesModel.findOne({ moudule_id: new Types.ObjectId(moduleId) }).exec();

    if (!quiz || !quiz.questions.length) {
      throw new Error('No questions available for this module.');
    }

    return {
      question: quiz.questions[0],
      message: 'Quiz started!',
    };
  }

  async submitAnswer(submitAnswerDto: SubmitAnswerDto) {
    const { questionId, answer } = submitAnswerDto;

    const quiz = await this.quizzesModel.findOne({ 'questions._id': new Types.ObjectId(questionId) }).exec();

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
    };

    return {
      score,
      totalQuestions: quiz.questions.length,
      evaluatedAnswers,
    };
  }


  determineNextQuestion(
    quiz: Quiz,
    currentQuestionId: string,
  ): any | null {
    const currentIndex = quiz.questions.findIndex(
      (q: any) => q._id.toString() === currentQuestionId,
    );

  async getQuizResults(moduleId: string, userId: string) {
    const results = await this.quizzesModel.aggregate([
      { $match: { moudule_id: new Types.ObjectId(moduleId) } },
      {
        $lookup: {
          from: 'attempts',
          localField: '_id',
          foreignField: 'quiz_id',
          as: 'attempts',
        },
      },
      { $unwind: '$attempts' },
      { $match: { 'attempts.user_id': new Types.ObjectId(userId) } },
    ]);

    return quiz.questions[currentIndex + 1] || null;
  }
}
