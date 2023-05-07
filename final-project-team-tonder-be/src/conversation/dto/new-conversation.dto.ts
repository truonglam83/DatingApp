import { MessageDto } from "src/message/dto/message.dto";
import { SocketNotification } from "src/notification/dto/socket-notification";

export class NewConversationDto {
    conversationId: string;
    user: SocketNotification;
    infoLastMess: MessageDto;
}

