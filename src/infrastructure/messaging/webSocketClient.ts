import WebSocket from 'ws';

class WebSocketClient {
	public readonly id: string;

	private ws: WebSocket | null = null;
	private url: string;
	private subprotocol: string;

	constructor(id: string, url: string, subprotocol: string) {
		this.id = id;
		this.url = url;
		this.subprotocol = subprotocol;
	}

	connect(): Promise<void> {
		this.ws = new WebSocket(this.url, this.subprotocol);

		return new Promise((resolve, reject) => {
			if (!this.ws) return reject(new Error('WebSocket instance not created'));

			const onOpen = () => {
				console.log(`[${this.id}] (out) WebSocket connection established to ${this.url}`);
				this.ws?.removeListener('error', onError);
				resolve();
			};

			const onError = (err: Error) => {
				console.error(`[${this.id}] (in) WebSocket connection error:`, err);
				this.ws?.removeListener('open', onOpen);
				this.ws = null;
				reject(err);
			};

			this.ws.once('open', onOpen);
			this.ws.once('error', onError);

			this.ws.on('message', (data: WebSocket.Data) => {
				console.log(`[${this.id}] (in) Received message:`, data.toString());
			});

			this.ws.on('close', (code: number, reason: Buffer) => {
				console.log(`[${this.id}] (in) WebSocket connection closed. Code: ${code}, Reason: ${reason.toString()}`);
				this.ws = null;
			});

			this.ws.on('error', (err: Error) => {
				console.error(`[${this.id}] (in) WebSocket error:`, err);
			});

			this.ws.on('pong', () => {
				console.log(`[${this.id}] (in) Received pong`);
			});
		});
	}

	send(message: string): void {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(message);
			console.log(`[${this.id}] (out) Sent message:`, message);
		}
	}

	ping(): void {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.ping();
			console.log(`[${this.id}] (out) Sent ping`);
		}
	}
}

export default WebSocketClient;