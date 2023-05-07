/* eslint-disable prettier/prettier */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';
import { NewMessageDto } from './dto/new-messsage.dto';
import { MessageEntity } from './entities/message.entity';
import { IMessageService } from './interfaces/message.interface';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    private readonly _firebaseService: FirebaseService,
    @InjectMapper() private readonly _mapper: Mapper,
    @InjectRepository(MessageEntity)
    private _messageRepo: Repository<MessageEntity>
  ) {}

  async findConversationInMsg(
    conversationId: string
  ): Promise<CreateMessageDto> {
    if (!conversationId) throw new BadRequestException('Invalid conversation');

    try {
      const conversationExist = await this._messageRepo.findOne({
        where: { conversationId },
      });

      if (!conversationExist) {
        return;
      } else {
        const data = this._mapper.map(
          conversationExist,
          MessageEntity,
          CreateMessageDto
        );

        return data;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createMessage(
    @UploadedFile() file: Express.Multer.File,
    params: CreateMessageDto
  ): Promise<any> {
    try {
      if (file) {
        const path = `images/${Date.now()}_${file.filename}`;
        const images = await this._firebaseService.uploadFile(
          file.buffer,
          path
        );
        // console.log('images ne', images);
        params.content = images;
        params.type = 'image';
      }

      const mess = await this._messageRepo.save(params);
      return mess;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getMessages(conversationId: string): Promise<MessageDto[]> {
    const data = await this._messageRepo.find({
      where: { conversationId: conversationId },
      order: { createdAt: 'ASC' },
    });
    const response = this._mapper.mapArray(data, MessageEntity, MessageDto);
    return response;
  }

  async updateMessageFlag(messageId: string, userId: string): Promise<void> {
    await this._messageRepo.update(
      { id: messageId, receiver: userId },
      { isSeen: true }
    );
  }

  // Update is seen message when receiver join chat
  async updateAllMessageFlag(
    conversationId: string,
    userId: string
  ): Promise<void> {
    await this._messageRepo.update(
      { conversationId: conversationId, receiver: userId },
      { isSeen: true }
    );
  }
  async getLastMessage(conversationId: string): Promise<MessageDto> {
    const data = await this._messageRepo.findOne({
      where: { conversationId: conversationId },
      order: { createdAt: 'DESC' },
    });
    const response = this._mapper.map(data, MessageEntity, MessageDto);
    return response;
  }

  async getAllMessages(
    conversationId: string,
    page: number,
    limit: number
  ): Promise<NewMessageDto> {
    try {
      // messages: list of messages
      // total: number of messages
      const [messages, total] = await this._messageRepo.findAndCount({
        where: { conversationId },
        order: { createdAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      const totalPages: number = Math.ceil(total / limit);

      return {
        data: {
          totalPages,
          messages: messages,
        },
      };
    } catch (err) {
      throw new BadRequestException('No data found');
    }
  }
}
