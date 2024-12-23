import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UsersService,
  ) {}

  async getRecommendations(userId: string) {
    try {
      // Logging userId
      console.log('Received userId:', userId);

      // Fetch user information including courses
      const user = await this.userService.findById(userId);

      if (!user) {
        console.error('User not found:', userId);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const courses = user.courses;
      // Logging courses
      console.log('Fetched courses:', courses);

      const response = await firstValueFrom(
        this.httpService.post('http://localhost:5000/recommend', {
          userId,
          courses,
        }),
      );

      return response.data;
    } catch (error) {
      // Logging error
      console.error('Failed to get recommendations:', error);
      throw new HttpException(
        `Failed to get recommendations: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
