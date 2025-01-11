import { useEffect, useState } from "react";
import { PackageAdminI } from "../../interfaces/PackageI";
import Layout from "../../componets/Layout/Layout";
import { Link } from "react-router";
import { getCookieToken } from "../../services/cookies/cookies";
import ListPackages from "../../componets/ListPackages/ListPackages";

const Dashboard = () => {
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
          <div className="flex flex-wrap gap-2">
            <Link
              to={"/create-package"}
              className="bg-green-600 w-fit h-fit px-3 py-1 hover:brightness-90"
            >
              Crear
            </Link>
            <Link
              to={"/reports"}
              className="bg-blue-600 w-fit h-fit px-3 py-1 hover:brightness-90"
            >
              Reportes
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : !packages.length ? (
          <div className="text-center">No existen paquetes hasta ahora</div>
        ) : (
          <ListPackages packages={packages} handleDelete={handleDelete} />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
