import { Module } from '@nestjs/common'; // Import the Module decorator
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { User, UserSchema } from './user.schema'; // Import User schema
import { UsersController } from './users.controller'; // Controller (if it exists)
import { UsersService } from './users.service'; // Service (if it exists)

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController], // Include your UsersController
  providers: [UsersService], // Include your UsersService
  exports: [UsersService], // Export UsersService if needed in other modules
})
export class UsersModule {}
