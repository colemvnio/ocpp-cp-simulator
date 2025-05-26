import { StatusNotificationErrorCode, StatusNotificationStatus } from '../enums/StatusNotification.enum';

export interface StatusNotificationRequest {
    connectorId: number;
    errorCode: StatusNotificationErrorCode;
    info?: string;
    status: StatusNotificationStatus;
    timestamp?: string;
    vendorId?: string;
    vendorErrorCode?: string;
  }