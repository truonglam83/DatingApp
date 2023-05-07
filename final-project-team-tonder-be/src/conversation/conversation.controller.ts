import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateAuthDto } from './../auth/dto/create-auth.dto';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { NewConversationDto } from './dto/new-conversation.dto';
import { ConversationDto } from './dto/conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly _conversationService: ConversationService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAllListChat(
    @User() user: CreateAuthDto
  ): Promise<NewConversationDto[]> {
    const result = await this._conversationService.getAllListChat(user.id);
    return result;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createConversation(
    @User() user: CreateAuthDto,
    @Body() receiver
  ): Promise<CreateConversationDto> {
    return await this._conversationService.createConversation(
      user.id,
      receiver.receiverId
    );
  }

  @Post('room')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getInfoChat(@Body() req: { roomId: string }): Promise<ConversationDto> {
    return await this._conversationService.getInfoChat(req.roomId);
  }
}
