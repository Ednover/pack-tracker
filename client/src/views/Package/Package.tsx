import { useEffect, useState } from "react";
import { Params, useParams } from "react-router";
import { PackageI } from "../../interfaces/PackageI";
import PackageInfo from "../../componets/PackageInfo/PackageInfo";
import Layout from "../../componets/Layout/Layout";
import { getCookieToken } from "../../services/cookies/cookies";

const Package = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const [packageData, setPackageData] = useState<PackageI | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/admin/package/${id}`,
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
          if (result.message == "Package not found") {
            alert("El paquete no existe, revise su número de rastreo");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setPackageData(null);
          return;
        }
        setPackageData(result);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id]);

  const updatePackage = async (location: string, status: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/admin/packages/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location,
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setPackageData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (isDelivery: boolean) => {
    if (isDelivery) {
      updatePackage("El paquete ya fue entregado", "Entregado");
      return;
    }
    updatePackage("En carretera Merida-Campeche", "En camino");
  };

  return (
    <Layout>
      {loading ? (
        <p>Cargando...</p>
      ) : packageData ? (
        <div className="mx-3">
          <div className="flex justify-between mb-3">
            <button
              className="bg-yellow-600 w-fit px-3 py-1 hover:brightness-90"
              disabled={packageData.tracking.currentStatus === "Entregado"}
              onClick={() => handleSubmit(false)}
            >
              Actualizar
            </button>
            <button
              className="bg-green-600 w-fit px-3 py-1 hover:brightness-90"
              disabled={packageData.tracking.currentStatus === "Entregado"}
              onClick={() => handleSubmit(true)}
            >
              Entregar
            </button>
          </div>
          <PackageInfo packageData={packageData} />
        </div>
      ) : (
        <div>Paquete no encontrado</div>
      )}
    </Layout>
  );
};

export default Package;
