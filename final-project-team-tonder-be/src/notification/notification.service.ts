import { NotificationDto } from './dto/notification.dto';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Injectable } from '@nestjs/common';
import { SocketNotification } from './dto/socket-notification';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { INotificationService } from './interfaces/notification.interface';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly _notiRepo: Repository<NotificationEntity>,
    @InjectMapper() private readonly _mapper: Mapper
  ) { }

  async createNoti(
    userId: string,
    matchedUserId: string
  ): Promise<NotificationDto> {
    if (!userId || !matchedUserId)
      throw new BadRequestException('UserId is required');
    try {
      const data = await this._notiRepo.save({
        userId,
        matchedUser: matchedUserId,
        message: 'Đừng để người ta chờ đợi, gửi lời chào ngay',
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getNotifications(userId: string): Promise<NotificationDto[]> {
    if (!userId) throw new BadRequestException('User not found');

    try {
      const getNotification = await this._notiRepo
        .createQueryBuilder('notification')
        .leftJoin('notification.fromUser', 'user')
        .where('notification.userId = :userId', { userId: userId })
        .select([
          'user.id',
          'user.avatar',
          'user.name',
          'notification.id',
          'notification.isSeen',
        ])
        .orderBy('notification.createdAt', 'DESC')
        .getMany();

      return getNotification;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateNotification(notiId: string): Promise<UpdateResult> {
    if (!notiId) throw new BadRequestException('Invalid notification');
    try {
      const data = await this._notiRepo.update(
        { id: notiId },
        { isSeen: true }
      );
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
