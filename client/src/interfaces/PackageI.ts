export interface PackageI {
  trackingID: string;
  description: string;
  size: string;
  tracking: TrackingI;
  receiver: ReceiverI;
}

export interface TrackingI {
  currentLocation: string;
  currentStatus: string;
  lastUpdate: string;
  history: HistoryI[];
}

export interface HistoryI {
  location: string;
  timestamp: string;
  status: string;
}

export interface ReceiverI {
  name: string;
  email: string;
}

export interface PackageAdminI {
  _id: string;
  trackingID: string;
  description: string;
  size: string;
  tracking: TrackingI;
  receiver: ReceiverI;
}
