import { Put } from '@nestjs/common';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { SocketNotification } from './dto/socket-notification';
import { UpdateResult } from 'typeorm';
import { NotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getNotifications(@User() user: CreateAuthDto): Promise<NotificationDto[]> {
    return await this.notificationService.getNotifications(user.id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateNotification(
    @Body() notiId: { id: string }
  ): Promise<UpdateResult> {
    return await this.notificationService.updateNotification(notiId.id);
  }
}
