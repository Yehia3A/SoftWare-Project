import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification, NotificationSchema } from './notification.schema';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },  // Import Notification schema
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Include User schema if it's in the same module
    // Import UserModule (or wherever your User schema is defined)
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],  // Export NotificationService for use in other modules
})
export class NotificationModule {}
