import { PackageDBI } from "../interfaces/Package.interfaces";
import { mapToPackageAdminDTO, PackageAdminDTO } from "./packageAdmin.dtos";

interface ReportDTO {
  packagesCreated: number;
  preparationPackages: PackageAdminDTO[];
  progressPackages: PackageAdminDTO[];
  deliveryPackages: PackageAdminDTO[];
  listPackages: PackageAdminDTO[];
}

interface ReportI {
  packagesCreated: number;
  preparationPackages: PackageDBI[];
  progressPackages: PackageDBI[];
  deliveryPackages: PackageDBI[];
  listPackages: PackageDBI[];
}

export function mapToReportDTO(report: ReportI): ReportDTO {
  const {
    packagesCreated,
    deliveryPackages,
    listPackages,
    preparationPackages,
    progressPackages,
  } = report;
  return {
    packagesCreated,
    preparationPackages: preparationPackages.map(mapToPackageAdminDTO),
    deliveryPackages: deliveryPackages.map(mapToPackageAdminDTO),
    listPackages: listPackages.map(mapToPackageAdminDTO),
    progressPackages: progressPackages.map(mapToPackageAdminDTO),
  }
}
