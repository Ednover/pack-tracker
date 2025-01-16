import {
  PackageDBI,
  ReceiverI,
  TrackingI,
} from "../interfaces/Package.interfaces";
import { mapToTrackingDTO } from "./tracking.dtos";

export interface PackageAdminDTO {
  _id: string;
  description: string;
  size: string;
  tracking: TrackingI;
  receiver: ReceiverI;
}

export function mapToPackageAdminDTO(packageData: PackageDBI): PackageAdminDTO {
  const { _id, description, size, tracking, receiver } = packageData;
  return {
    _id,
    description,
    size,
    receiver,
    tracking: mapToTrackingDTO(tracking),
  };
}

