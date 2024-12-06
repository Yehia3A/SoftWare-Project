import { IsBoolean } from 'class-validator';

export class MarkNotificationReadDto {
  @IsBoolean()
  isRead: boolean;  // Whether the notification is read
}