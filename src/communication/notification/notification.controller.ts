// notification.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create.notification.dto';
import { MarkNotificationReadDto } from './dto/mark.notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create a new notification
  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.createNotification(createNotificationDto);
  }

  // Get all notifications for a specific user
  @Get(':userId')
  async getNotifications(@Param('userId') userId: string) {
    return await this.notificationService.getNotifications(userId);
  }

  // Mark a notification as read
  @Put(':notificationId/read')
  async markAsRead(
    @Param('notificationId') notificationId: string,
    @Body() markNotificationReadDto: MarkNotificationReadDto,
  ) {
    return await this.notificationService.markAsRead(notificationId, markNotificationReadDto);
  }

  // Delete a notification
  @Delete(':notificationId')
  async deleteNotification(@Param('notificationId') notificationId: string) {
    return await this.notificationService.deleteNotification(notificationId);
  }
}

