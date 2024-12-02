import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quizzes, QuizzesDocument } from './quizzes.schema';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class QuizzesService {
  constructor(
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
      throw new Error('Question not found.');
    }

    const question = quiz.questions.find((q: any) => q._id.equals(new Types.ObjectId(questionId)));
    const isCorrect = question.correctAnswer === answer;

    const currentIndex = quiz.questions.findIndex((q: any) => q._id.equals(new Types.ObjectId(questionId)));
    const nextQuestion = quiz.questions[currentIndex + 1];

    const feedback = {
      isCorrect,
      explanation: question.explanation,  // Provide explanation here
      correctAnswer: question.correctAnswer,  // Provide correct answer here
    };

    return {
      feedback,
      nextQuestion,
    };
  }

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

    return results;
  }
}
