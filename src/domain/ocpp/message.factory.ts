import { SupportedVersions } from './supported-versions.enum';
import { Ocpp16MessageFactory } from './v1.6/message.factory';

export class MessageFactory {
	static create(version: SupportedVersions): Ocpp16MessageFactory {
		switch (version) {
		case SupportedVersions.OCPP_1_6:
			return new Ocpp16MessageFactory();
		// case '2.0.1':
			//   return new Ocpp201MessageFactory();
		default:
			throw new Error(`Unsupported OCPP version: ${version}`);
		}
	}
}



