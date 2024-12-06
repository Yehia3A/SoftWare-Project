// create-notification.dto.ts
import { IsString, IsNotEmpty, IsMongoId ,IsOptional} from 'class-validator';

export class CreateNotificationDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;  // User ID for whom the notification is being created

  @IsString()
  @IsNotEmpty()
  type: string;  // Type of notification (e.g., 'message', 'alert')

  @IsString()
  @IsNotEmpty()
  title: string;  // Title of the notification

  @IsString()
  @IsNotEmpty()
  message: string;  // The notification message

  @IsOptional()
  isRead?: boolean;  // Optional field, default to false if not provided
}
