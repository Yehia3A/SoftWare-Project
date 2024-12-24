import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './quizzes.schema';
import { Modules, ModuleDocument } from '../modules/modules.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Modules.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async getUserLastGrade(userId: string): Promise<number | null> {
    const lastQuiz = await this.quizModel
      .findOne({ userId, status: 'Completed' })
      .sort({ updatedAt: -1 })
      .exec();
  
    return lastQuiz ? lastQuiz.grade : null;
  }





  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { moduleId, numberOfQuestions } = createQuizDto;
  
    const module = await this.moduleModel.findById(moduleId).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID "${moduleId}" not found.`);
    }
  
    // Ensure there are enough questions in the module's question bank
    if (module.questionBank.length < numberOfQuestions) {
      throw new Error(`Not enough questions available in the module's question bank.`);
    }
  
    // Randomly select the required number of questions
    const selectedQuestions = module.questionBank
      .sort(() => Math.random() - 0.5) // Shuffle the questions
      .slice(0, numberOfQuestions);
  
    // Create the quiz with the selected questions
    const quiz = new this.quizModel({
      moduleId,
      numberOfQuestions,
      questions: selectedQuestions,
      status: 'Not Started',
    });
  
    return quiz.save();
  }




  
  async startQuiz(quizId: string,userId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${quizId}" not found.`);
    }
  
    if (quiz.status !== 'Not Started') {
      throw new Error('Quiz has already been started or completed.');
    }
  
    const module = await this.moduleModel.findById(quiz.moduleId).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID "${quiz.moduleId}" not found.`);
    }
  
    // Fetch the user's last grade
    const lastQuiz = await this.quizModel
      .findOne({ userId: quiz.userId, status: 'Completed' })
      .sort({ updatedAt: -1 })
      .exec();
    const userLastGrade = lastQuiz?.grade || null;
  
    // Determine difficulty levels based on the last grade
    let difficulties = [];
    if (userLastGrade === null) {
      difficulties = ['Easy', 'Medium', 'Hard']; // No previous grade, include all
    } else if (userLastGrade < 30) {
      difficulties = ['Easy'];
    } else if (userLastGrade < 50) {
      difficulties = ['Easy', 'Medium'];
    } else {
      difficulties = ['Easy', 'Medium', 'Hard'];
    }
  
    // Filter questions from the module's question bank
    const filteredQuestions = module.questionBank.filter((q) =>
      difficulties.includes(q.difficulty),
    );
  
    // Ensure there are enough questions
    if (filteredQuestions.length < quiz.numberOfQuestions) {
      throw new Error(`Not enough questions available for the selected difficulties.`);
    }
  
    // Randomly select the required number of questions
    const selectedQuestions = filteredQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, quiz.numberOfQuestions);
  
    // Update the quiz with the adjusted questions and mark as 'In Progress'
    quiz.questions = selectedQuestions.map(question => ({
      ...question,
      options: question.options || []
    }));
    quiz.status = 'In Progress';
    await quiz.save();
  
    return quiz;
  }
  
  



  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found.`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(id, updateQuizDto, {
      new: true,
    }).exec();
    if (!updatedQuiz) {
      throw new NotFoundException(`Quiz with ID "${id}" not found.`);
    }
    return updatedQuiz;
  }

  async remove(id: string): Promise<void> {
    const result = await this.quizModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Quiz with ID "${id}" not found.`);
    }
  }
  async gradeQuiz(quizId: string, userAnswers: Record<string, string>): Promise<number> {
    const quiz = await this.quizModel.findById(quizId).exec();
  
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID "${quizId}" not found.`);
    }
  
    if (quiz.status !== 'In Progress') {
      throw new Error('Quiz must be in progress to submit answers.');
    }
  
    // Calculate the grade
    let correctAnswersCount = 0;
  
    quiz.questions.forEach((question) => {
      const userAnswer = userAnswers[question['id']];
      if (userAnswer && userAnswer === question.correctAnswer) {
        correctAnswersCount++;
      }
    });
  
    const grade = (correctAnswersCount / quiz.numberOfQuestions) * 100;
  
    // Update the quiz with the grade and mark it as completed
    quiz.grade = grade;
    quiz.status = 'Completed';
    await quiz.save();
  
    return grade;
  }
  
}

