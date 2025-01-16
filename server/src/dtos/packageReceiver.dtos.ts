import { PackageDBI, PackageI } from "../interfaces/Package.interfaces";
import { mapToTrackingDTO } from "./tracking.dtos";

export function mapToPackageReceiverDTO(packageData: PackageDBI): PackageI {
    const { trackingID, description, size, tracking, receiver } = packageData;
    return {
        trackingID,
        description,
    size,
    receiver,
    tracking: mapToTrackingDTO(tracking),
    }
}