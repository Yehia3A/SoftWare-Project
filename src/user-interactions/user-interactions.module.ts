import { Module } from '@nestjs/common';
import { UserInteractionsService } from './user-interactions.service';
import { UserInteractionsController } from './user-interactions.controller';

@Module({
  providers: [UserInteractionsService],
  controllers: [UserInteractionsController]
})
export class UserInteractionsModule {}
