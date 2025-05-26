import WebSocketClient from './infrastructure/messaging/webSocketClient';
import { ChargePoint } from './domain/entities/chargepoint.entity';
import { MessageFactory } from './domain/ocpp/message.factory';
import { config } from '../config';

const chargePoint = new ChargePoint('Simulator Inc.', 'Sim-X1');
const ocppMessageFactory = MessageFactory.create(chargePoint.version);

const webSocketClient = new WebSocketClient(chargePoint.id, config.messaging.websocket.url, `ocpp${chargePoint.version}`);

async function startSimulation() {
	try {
		await webSocketClient.connect();
		chargePoint.sendHeartbeat(webSocketClient, ocppMessageFactory, ocppMessageFactory.createMessageId());

		await webSocketClient.close();
	} catch (error) {
		console.error(`[${chargePoint.name}] Failed to connect or run simulation:`, error);
	}
}

startSimulation();

process.on('SIGINT', () => {
	console.log(`[${chargePoint.name}] Shutting down...`);
	process.exit(0);
});