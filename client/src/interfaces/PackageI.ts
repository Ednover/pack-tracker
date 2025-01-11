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

export interface PackageFormI {
  description: string;
  size: string;
  receiver: ReceiverI;
}

export interface ReportsInfoI {
  packagesCreated: number;
  preparationPackages: PackageAdminI[];
  progressPackages: PackageAdminI[];
  deliveryPackages: PackageAdminI[];
  listPackages: PackageAdminI[];
}