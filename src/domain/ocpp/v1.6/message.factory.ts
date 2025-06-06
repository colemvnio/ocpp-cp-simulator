import { OcppAction } from './enums/OcppAction.enum';
import { BootNotificationRequest } from './types/BootNotification';
import { HeartbeatRequest } from './types/Heartbeat.d';
import { StatusNotificationRequest } from './types/StatusNotification.d';

type OcppRequestMessage<T> = [2, string, OcppAction, T];

export class Ocpp16MessageFactory {
	private createMessageId(): string {
		return (Date.now().toString(36) + Math.random().toString(36).substring(2)).toUpperCase().slice(0, 10);
	}

	createBootNotificationMessage(payload: BootNotificationRequest): OcppRequestMessage<BootNotificationRequest> {
		return [2, this.createMessageId(), OcppAction.BootNotification, payload];
	}

	createHeartbeatMessage(payload: HeartbeatRequest): OcppRequestMessage<HeartbeatRequest> {
		return [2, this.createMessageId(), OcppAction.Heartbeat, payload];
	}

	createStatusNotificationMessage(payload: StatusNotificationRequest): OcppRequestMessage<StatusNotificationRequest> {
		return [2, this.createMessageId(), OcppAction.StatusNotification, payload];
	}
}

