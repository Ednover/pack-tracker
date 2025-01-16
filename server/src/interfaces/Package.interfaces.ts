export interface PackageI {
  trackingID: string;
  description: string;
  size: string;
  tracking: TrackingI;
  receiver: ReceiverI;
}

export interface PackageDBI {
  _id: string;
  trackingID: string;
  description: string;
  size: string;
  tracking: TrackingI;
  receiver: ReceiverI;
}

export interface TrackingI {
  currentLocation: string;
  currentStatus: string;
  lastUpdate: Date;
  history: HistoryI[];
}

export interface HistoryI {
  location: string;
  timestamp: Date;
  status: string;
}

export interface ReceiverI {
  name: string;
  email: string;
}
