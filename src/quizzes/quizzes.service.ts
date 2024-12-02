import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Quizzes } from './quizzes.schema';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quizzes.name) private quizzesModel: Model<Quizzes>,
  ) {}

  async startQuiz(moduleId: string) {
    // Fetch a quiz by module ID
    const quiz = await this.quizzesModel.findOne({ module_id: new Types.ObjectId(moduleId) }).exec();

    if (!quiz || !quiz.questions.length) {
      throw new Error('No questions available for this module.');
    }

    // Return the first question to start the quiz
    return {
      question: quiz.questions[0],
      message: 'Quiz started!',
    };
  }

  async submitAnswer(submitAnswerDto: SubmitAnswerDto) {
    const { questionId, answer, attemptId } = submitAnswerDto;

    // Simulate fetching the question (in real scenarios, you can normalize data further)
    const quiz = await this.quizzesModel.findOne({ 'questions._id': questionId }).exec();
    if (!quiz) {
      throw new Error('Question not found.');
    }

    const question = quiz.questions.find((q: any) => q._id.equals(questionId));
    const isCorrect = question.correctAnswer === answer;

    // Determine next question (for adaptive behavior)
    const currentIndex = quiz.questions.findIndex((q: any) => q._id.equals(questionId));
    const nextQuestion = quiz.questions[currentIndex + 1];

    // Feedback object
    const feedback = {
      isCorrect,
      explanation: question.explanation,
    };

    return {
      feedback,
      nextQuestion,
    };
  }

  async getQuizResults(moduleId: string, userId: string) {
    // Aggregate quiz results for a specific module and user
    const results = await this.quizzesModel.aggregate([
      { $match: { module_id: new Types.ObjectId(moduleId) } },
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
