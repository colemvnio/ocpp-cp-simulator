export interface BootNotificationRequest {
    chargePointVendor: string;
    chargePointModel: string;
    chargePointSerialNumber?: string;
    chargeBoxSerialNumber?: string;
    firmwareVersion?: string;
    iccid?: string;
    imsi?: string;
    meterType?: string;
    meterSerialNumber?: string;
  }