
export class CreateConversationDto {
    id: string;

    message?: {
        createdAt?: Date;
        content: string
    }[];

    toUser?: {
        name: string;
        avatar: string
    }
}

