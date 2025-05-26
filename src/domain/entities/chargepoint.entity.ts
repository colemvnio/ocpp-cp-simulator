import WebSocketClient from '../../infrastructure/messaging/webSocketClient';
import { Ocpp16MessageFactory } from '../ocpp/v1.6/message.factory';
import { HeartbeatRequest } from '../ocpp/v1.6/types/Heartbeat.d';
import { SupportedVersions } from '../ocpp/supported-versions.enum';

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

	sendHeartbeat(
		client: WebSocketClient,
		messageFactory: Ocpp16MessageFactory,
	) {
		const payload: HeartbeatRequest = {};

		const msg = messageFactory.createHeartbeatMessage(payload);
		client.send(JSON.stringify(msg));
	}
}