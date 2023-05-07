import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { MessageDto } from './dto/message.dto';
import { NewMessageDto } from './dto/new-messsage.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly _messageService: MessageService) { }

  @Get(':id')
  async Chat(@Param('id') id: string): Promise<MessageDto[]> {
    return await this._messageService.getMessages(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createNewMessage(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: CreateMessageDto
  ) {
    return await this._messageService.createMessage(file, params);
  }

  @Get('last-message/:id')
  async getLastMessageByConversationId(@Param('id') id: string): Promise<MessageDto> {
    return await this._messageService.getLastMessage(id);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All message' })
  async getAllMessages(
    @Query() params: any
  ): Promise<NewMessageDto> {
    return await this._messageService.getAllMessages(
      params.conversationId,
      params.pages,
      params.limit,
    );
  }
}
