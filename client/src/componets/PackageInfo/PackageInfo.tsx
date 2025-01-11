import { PackageI } from "../../interfaces/PackageI";
import { formatDate } from "../../utils/formatDate";

interface Props {
  packageData: PackageI;
}

const PackageInfo: React.FC<Props> = ({ packageData }) => {
  return (
    <>
    <div className="mb-3">
      <b className="text-xl">{packageData.description}</b>
      <p>{packageData.size}</p>
    </div>
      <div className="w-fit mx-auto">
        {packageData.tracking.history.map((object, index) => (
          <div key={index} className="flex flex-col gap-1 justify-center mb-1">
            <p className="text-lg text-gray-500">{object.status}</p>
            <p className="text-base">
              {formatDate(object.timestamp)} | {object.location}
            </p>
          </div>
        ))}
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-lg text-green-500">
            {packageData.tracking.currentStatus}
          </p>
          <p className="text-base">
            {formatDate(packageData.tracking.lastUpdate)} |{" "}
            {packageData.tracking.currentLocation}
          </p>
        </div>
      </div>
    </>
  );
};

export default PackageInfo;
