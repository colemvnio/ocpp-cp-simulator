import WebSocketClient from './infrastructure/messaging/webSocketClient';

const client = new WebSocketClient('test-client', 'ws://localhost:8080', 'ocpp1.6');

client.connect()
	.then(() => {
		console.log('Connected!');
		client.send(JSON.stringify({ message: 'Hello OCPP server!' }));
		client.ping();
	})
	.catch((err) => {
		console.error('Connection failed:', err);
	});