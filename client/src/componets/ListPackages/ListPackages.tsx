import { useNavigate } from "react-router";
import { PackageAdminI } from "../../interfaces/PackageI";

interface ListPackagesProps {
  packages: PackageAdminI[];
  handleDelete?: (id: string) => void;
}

const ListPackages: React.FC<ListPackagesProps> = ({
  packages,
  handleDelete,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/package/${id}`);
  };

  return (
    <div className="border border-white">
      {packages.map((packageData, index) => (
        <div
          key={index}
          className="border border-white bg-slate-800 border-x-0 border-b-0 px-2 flex  gap-4 justify-between hover:brightness-90"
        >
          <div
            className="hover:cursor-pointer hover:underline py-3 w-full"
            onClick={() => handleNavigation(packageData._id)}
          >
            <b>{packageData._id}</b>
            <p>{packageData.description}</p>
          </div>
          <div className="flex sm:flex-nowrap flex-wrap gap-2 py-3 items-center justify-end sm:text-nowrap text-end">
            <p>{packageData.tracking.currentStatus}</p>
            {handleDelete ? (
              <button
                className="bg-red-600 w-fit h-fit px-3 py-1 hover:brightness-90"
                onClick={() => handleDelete(packageData._id)}
              >
                Eliminar
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPackages;
