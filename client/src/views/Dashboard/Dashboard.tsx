import { useEffect, useState } from "react";
import { PackageAdminI } from "../../interfaces/PackageI";
import Layout from "../../componets/Layout/Layout";
import { Link, useNavigate } from "react-router";
import { getCookieToken } from "../../services/cookies/cookies";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [packages, setPackages] = useState<PackageAdminI[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/admin/packages`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookieToken()}`,
            },
          }
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setPackages(result);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleNavigation = (id: string) => {
    navigate(`/package/${id}`);
  };

  const deletePackage = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/admin/packages/${id}/update`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      if (result.message === "Package deleted successfully") {
        alert("El paquete fue elimado con éxito");
        removePackage(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removePackage = (id: string) => {
    const updatePackages = packages.filter(
      (packageData) => packageData._id !== id
    );
    setPackages(updatePackages);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Estás seguro que desea eliminar el paquete "${id}"`)) {
      deletePackage(id);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl md:w-full md:mx-auto mx-2">
        <div className="flex flex-wrap justify-between mb-4">
          <h1 className="sm:text-2xl text-xl text-center text-wrap">
            Lista de paquetes
          </h1>
          <Link
            to={"/create-package"}
            className="bg-green-600 w-fit h-fit px-3 py-1 hover:brightness-90"
          >
            Crear
          </Link>
        </div>
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : !packages.length ? (
          <div className="text-center">No existen paquetes hasta ahora</div>
        ) : (
          <div className="border border-white">
            {packages.map((packageData, index) => (
              <div
                key={index}
                className="border border-white bg-slate-800 border-x-0 border-b-0 px-2 flex  gap-4 justify-between hover:brightness-90"
              >
                <div
                  className="hover:cursor-pointer py-3"
                  onClick={() => handleNavigation(packageData._id)}
                >
                  <b>{packageData._id}</b>
                  <p>{packageData.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 py-3 items-center justify-end text-end">
                  <p>{packageData.tracking.currentStatus}</p>
                  <button
                    className="bg-red-600 w-fit h-fit px-3 py-1 hover:brightness-90"
                    onClick={() => handleDelete(packageData._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
