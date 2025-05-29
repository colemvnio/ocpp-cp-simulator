import { BootNotificationStatus } from '../enums/BootNotificationStatus.enum';

export interface BootNotificationResponse {
    status: BootNotificationStatus;
    currentTime: string;
    interval: number;
}