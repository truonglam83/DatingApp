import { ConversationDto } from "../dto/conversation.dto";
import { CreateConversationDto } from "../dto/create-conversation.dto";
import { NewConversationDto } from "../dto/new-conversation.dto";

export interface IConversationService {
    createConversation(userId: string, receiver: string): Promise<CreateConversationDto>;
    getAllListChat(userId: string): Promise<NewConversationDto[]>;
    getInfoChat(roomId: string): Promise<ConversationDto>;
    getConversationById(roomId: string): Promise<ConversationDto>;
}

