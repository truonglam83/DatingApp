import { MessageDto } from './../message/dto/message.dto';
import { ConversationDto } from 'src/conversation/dto/conversation.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { MessageService } from './../message/message.service';
import { ConversationEntity } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper, convertUsing } from '@automapper/core';
import { UserService } from 'src/user/user.service';
import { SocketNotification } from 'src/notification/dto/socket-notification';
import { NewConversationDto } from './dto/new-conversation.dto';
import { IConversationService } from './interfaces/conversation.interface';
import { ConversationMessage } from './dto/conversation-message.dto';

@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,
    @InjectRepository(ConversationEntity)
    private readonly _conversationRepo: Repository<ConversationEntity>,
    private readonly _messageRepo: MessageService,
    private readonly _userService: UserService
  ) { }

  // handle create a new conversation
  async createConversation(userId: string, receiver: string): Promise<CreateConversationDto> {
    if (!userId) throw new BadRequestException('User not found');

    // check conversation between user and receiver is exist
    const conversationExist: CreateConversationDto =
      await this._conversationRepo.findOne({
        where: [
          { userId, receiver },
          { userId: receiver, receiver: userId },
        ],
      });

    try {
      const conversation: CreateConversationDto = await this._conversationRepo.save({
        ...conversationExist,
        userId: userId,
        receiver: receiver,
      });

      // find conversation in table message is exist or not
      await this._messageRepo.findConversationInMsg(conversation.id);
      return conversation;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // handle show list chat
  async getAllListChat(userId: string): Promise<NewConversationDto[]> {
    if (!userId) throw new BadRequestException('User not found');

    try {
      // get block users
      const getBlockUser: string[] = await this._userService.getBlackList(userId);

      const conversationBuilder = this._conversationRepo
        .createQueryBuilder('conversation')
        .where(
          new Brackets((qb) => {
            qb.where('conversation.userId =:userId', {
              userId: userId,
            }).orWhere('conversation.receiver =:userId', { userId: userId });
          })
        );

      if (getBlockUser.length) {
        conversationBuilder.andWhere(
          new Brackets((qb) => {
            qb.andWhere('conversation.userId NOT IN (:...getBlockUser)', {
              getBlockUser: getBlockUser,
            }).andWhere('conversation.receiver NOT IN (:...getBlockUser)', {
              getBlockUser: getBlockUser,
            });
          })
        );
      };

      const data = await conversationBuilder.getMany();
      const conversation = this._mapper.mapArray(data, ConversationEntity, ConversationDto);

      const conversationResult: string[] = [];

      conversation.map((item: ConversationDto) => {
        if (item.userId === userId) {
          conversationResult.push(item.receiver);
        } else {
          conversationResult.push(item.userId);
        }
      });
      if (conversationResult.length > 0) {
        const users: SocketNotification[] = await this._userService.findByIds(
          conversationResult
        );

        const result: ConversationMessage[] = conversation.map((con: ConversationDto) => {
          return {
            conversationId: con.id,
            user: users.find((user) => {
              if (user.id === con.userId || user.id === con.receiver) {
                return user;
              }
            }),
          };
        });

        // using map to get last message
        const data: NewConversationDto[] = await Promise.all(
          result.map(async (item: ConversationMessage) => {
            return {
              ...item,
              infoLastMess: await this._messageRepo.getLastMessage(
                item.conversationId
              ),
            };
          })
        );
        return data;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getInfoChat(roomId: string): Promise<ConversationDto> {
    const res = await this._conversationRepo.findOne({
      where: { id: roomId },
    });
    const data = this._mapper.map(res, ConversationEntity, ConversationDto);
    return data;
  }

  async getConversationById(roomId: string): Promise<ConversationDto> {
    const data = await this._conversationRepo.findOne({ where: { id: roomId } });
    const response = this._mapper.map(data, ConversationEntity, ConversationDto);
    return response;
  }
}
