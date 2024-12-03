import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInteractionsController } from './user-interactions.controller';
import { UserInteractionsService } from './user-interactions.service';
import { UserInteraction, UserInteractionSchema } from './user-interactions.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserInteraction.name, schema: UserInteractionSchema },
        ]),
    ],
    controllers: [UserInteractionsController],
    providers: [UserInteractionsService],
})
export class UserInteractionsModule {}