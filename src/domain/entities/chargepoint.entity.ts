import WebSocketClient from '../../infrastructure/messaging/webSocketClient';
import { Ocpp16MessageFactory } from '../ocpp/v1.6/message.factory';
import { HeartbeatRequest } from '../ocpp/v1.6/types/Heartbeat.d';
import { StatusNotificationRequest } from '../ocpp/v1.6/types/StatusNotification.d';
import { SupportedVersions } from '../ocpp/supported-versions.enum';
import { BootNotificationRequest } from '../ocpp/v1.6/types/BootNotification';

export class ChargePoint {
	public id: string;
	public name: string;

	constructor(
        public vendor: string = 'ocpp-cp-simulator',
        public model: string = 'Simulator-v1',
		public version: SupportedVersions = SupportedVersions.OCPP_1_6
	) {
		this.id = (Date.now().toString(36) + Math.random().toString(36).substring(2)).toUpperCase().slice(0, 10);
		this.name = `CP00${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
	}

	sendBootNotification(
		client: WebSocketClient,
		messageFactory: Ocpp16MessageFactory,
		payload: BootNotificationRequest
	): void {
		const msg = messageFactory.createBootNotificationMessage(payload);
		client.send(JSON.stringify(msg));
	}

	sendHeartbeat(
		client: WebSocketClient,
		messageFactory: Ocpp16MessageFactory,
	): void {
		const payload: HeartbeatRequest = {};

		const msg = messageFactory.createHeartbeatMessage(payload);
		client.send(JSON.stringify(msg));
	}

	sendStatusNotification(
		client: WebSocketClient,
		messageFactory: Ocpp16MessageFactory,
		payload: StatusNotificationRequest
	): void {
		const msg = messageFactory.createStatusNotificationMessage(payload);
		client.send(JSON.stringify(msg));
	}
}