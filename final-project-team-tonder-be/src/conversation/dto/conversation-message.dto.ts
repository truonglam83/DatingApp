import { SocketNotification } from "src/notification/dto/socket-notification";

export class ConversationMessage {
    conversationId: string;
    user: SocketNotification;
}