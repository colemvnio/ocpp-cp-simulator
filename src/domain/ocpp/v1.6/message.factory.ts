import { OcppAction } from './enums/OcppAction.enum';
import { HeartbeatRequest } from './types/Heartbeat.d';

type OcppRequestMessage<T> = [2, string, OcppAction, T];

export class Ocpp16MessageFactory {
	private createMessageId(): string {
		return (Date.now().toString(36) + Math.random().toString(36).substring(2)).toUpperCase().slice(0, 10);
	}

	createHeartbeatMessage(payload: HeartbeatRequest): OcppRequestMessage<HeartbeatRequest> {
		return [2, this.createMessageId(), OcppAction.Heartbeat, payload];
	}
}

