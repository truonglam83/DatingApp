import { SocketNotification } from "src/notification/dto/socket-notification";
import { MatchDto } from "../dto/match.dto";

export interface IMatchService {
    createMatch(userId: string, matchedUserId: string): Promise<SocketNotification[]>;
    getMatchedUserByUserId(userId: string): Promise<SocketNotification[]>;
    getUserHasLiked(userId: string): Promise<MatchDto[]>
}