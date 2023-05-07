import { NotificationDto } from "../dto/notification.dto";

export interface INotificationService {
    createNoti(userId: string, matchedUserId: string): Promise<NotificationDto>;
    getNotifications(userId: string): Promise<NotificationDto[]>;
}