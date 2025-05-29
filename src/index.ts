import WebSocketClient from './infrastructure/messaging/webSocketClient';
import { ChargePoint } from './domain/entities/chargepoint.entity';
import { MessageFactory } from './domain/ocpp/message.factory';
import { config } from '../config';
import { StatusNotificationErrorCode } from './domain/ocpp/v1.6/enums/StatusNotification.enum';
import { StatusNotificationStatus } from './domain/ocpp/v1.6/enums/StatusNotification.enum';

const chargePoint = new ChargePoint();
const ocppMessageFactory = MessageFactory.create(chargePoint.version);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const scenarios = [
	{
		description: 'Connect -> Ping -> OCPP.Heartbeat -> Close',
		action: async () => {
			const wsClient = new WebSocketClient(chargePoint.id, config.messaging.websocket.url, `ocpp${chargePoint.version}`);
			await wsClient.connect();
			await wsClient.ping();
			await sleep(1000);

			chargePoint.sendHeartbeat(wsClient, ocppMessageFactory);
			await sleep(1000);

			await wsClient.close();
		}
	},
	{
		description: 'Connect -> StatusNotification.Available -> Close',
		action: async () => {
			const wsClient = new WebSocketClient(chargePoint.id, config.messaging.websocket.url, `ocpp${chargePoint.version}`);
			await wsClient.connect();
			await wsClient.ping();
			await sleep(1000);

			chargePoint.sendStatusNotification(wsClient, ocppMessageFactory, {
				connectorId: 1,
				errorCode: StatusNotificationErrorCode.NoError,
				status: StatusNotificationStatus.Available,
			});
			await sleep(1000);	

			await wsClient.close();
		}
	}
];

async function startSimulation() {
	try {
		for (const scenario of scenarios) {
			console.log(`\n--- Running Scenario: ${scenario.description} ---`);
			await scenario.action();
			console.log(`\n--- Scenario Finished: ${scenario.description} ---`);
		}
	} catch (error) {
		console.error(`[${chargePoint.name}] Failed to connect or run simulation:`, error);
	}
	console.log('\n--- All Scenarios Finished ---');
	process.exit(0);
}

startSimulation();

process.on('SIGINT', () => {
	console.log(`[${chargePoint.name}] Shutting down...`);
	process.exit(0);
});