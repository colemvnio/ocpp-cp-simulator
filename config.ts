export const config = {
	env: process.env.NODE_ENV || 'local',
	ocpp: {
		defaultVersion: 'v1.6',
		supportedVersions: ['v1.6'],
	},
	messaging: {
		websocket: {
			url: process.env.MESSAGING_WEBSOCKET_URL || 'ws://localhost:8080'
		}
	}
};
