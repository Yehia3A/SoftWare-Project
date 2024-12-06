// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { CreateNotificationDto } from './dto/create.notification.dto';
import { MarkNotificationReadDto } from './dto/mark.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  // Create a new notification
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { userId, type, title, message, isRead = false } = createNotificationDto;

    const notification = new this.notificationModel({
      userId: new Types.ObjectId(userId),
      type,
      title,
      message,
      isRead,
    });

    return await notification.save();
  }

  // Get all notifications for a user
  async getNotifications(userId: string): Promise<Notification[]> {
    return await this.notificationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ timestamp: -1 });  // Sort by timestamp (newest first)
  }

  // Mark a notification as read
  async markAsRead(notificationId: string, markNotificationReadDto: MarkNotificationReadDto): Promise<Notification> {
    const { isRead } = markNotificationReadDto;

    const notification = await this.notificationModel.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.isRead = isRead;
    return await notification.save();
  }

  // Delete a notification
  async deleteNotification(notificationId: string): Promise<Notification> {
    const notification = await this.notificationModel.findByIdAndDelete(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }
}

