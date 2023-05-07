import { CreateMessageDto } from "../dto/create-message.dto";
import { MessageDto } from '../dto/message.dto';
import { NewMessageDto } from '../dto/new-messsage.dto';

export interface IMessageService {
    findConversationInMsg(conversationId: string): Promise<CreateMessageDto>;
    createMessage(file: Express.Multer.File, params: CreateMessageDto): Promise<any>;
    getMessages(conversationId: string): Promise<MessageDto[]>;
    updateMessageFlag(messageId: string, userId: string): Promise<void>;
    updateAllMessageFlag(conversationId: string, userId: string): Promise<void>
    getLastMessage(conversationId: string): Promise<MessageDto>;
    getAllMessages(conversationId: string, page: number, limit: number): Promise<NewMessageDto>;
}