import { MessageDto } from "./message.dto";

export class NewMessageDto {
    data: {
        totalPages: number;
        messages: MessageDto[];
    };
};