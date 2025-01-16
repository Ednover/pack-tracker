import { useEffect, useState } from "react";
import { Params, useParams } from "react-router";
import { PackageI, TrackingI } from "../../interfaces/PackageI";
import PackageInfo from "../../componets/PackageInfo/PackageInfo";
import Layout from "../../componets/Layout/Layout";
import { getCookieToken } from "../../services/cookies/cookies";
import Modal from "../../componets/Modals/Modal";
import Input from "../../componets/Input/Input";

interface TrackingSendI {
  location: string;
  date: string;
}

const options = [
  "En carretera Mérida-Veracruz",
  "En el centro de distribución de Veracruz",
  "En carretera Veracruz-CDMX",
  "En el centro de distribución de CDMX",
  "En camino a tu domicilio",
];

const maxInProgress = 5;

const Package = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState<boolean>(true);
  const [packageData, setPackageData] = useState<PackageI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tracking, setTracking] = useState<TrackingSendI>({
    location: "",
    date: "",
  });

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
        setTracking((prevTracking) => ({
          ...prevTracking,
          location: options[result.tracking.history.length],
        }));
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [id, packageData]);

  const updatePackage = async (location: string, status: string, datetime?: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/admin/packages/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieToken()}`,
          },
          body: JSON.stringify({
            location,
            status,
            datetime,
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
    updatePackage(tracking.location, "En camino", tracking.date);
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTracking({
      ...tracking,
      [name]: value,
    });
  };

  const isDisabledUpdate = (tracking: TrackingI) => {
    return tracking.currentStatus === "Entregado" || tracking.history.length === maxInProgress;
  };

  const isDisabledDelivery = (tracking: TrackingI) => {
    return (
      tracking.currentStatus === "Entregado" ||
      tracking.currentStatus === "En preparación"
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      {loading ? (
        <p>Cargando...</p>
      ) : packageData ? (
        <div className="mx-3">
          <div className="flex justify-between mb-3">
            <button
              className={`bg-yellow-600 w-fit px-3 py-1 ${
                isDisabledUpdate(packageData.tracking)
                  ? ""
                  : "hover:brightness-90"
              }`}
              disabled={isDisabledUpdate(packageData.tracking)}
              onClick={openModal}
            >
              Actualizar
            </button>
            <button
              className={`bg-green-600 text-gray-200 w-fit px-3 py-1 ${
                isDisabledDelivery(packageData.tracking)
                  ? ""
                  : "hover:brightness-90"
              }`}
              disabled={isDisabledDelivery(packageData.tracking)}
              onClick={() => handleSubmit(true)}
            >
              Entregar
            </button>
          </div>
          <PackageInfo packageData={packageData} />
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="p-4">
              <Input
                name="location"
                onChange={handleChange}
                title="Ubicación"
                value={tracking.location}
                bgColor="#e5e7eb"
                className="w-full"
              />
              <Input
                name="date"
                onChange={handleChange}
                title="Fecha"
                value={tracking.date}
                type="datetime-local"
                bgColor="#e5e7eb"
              />
              <button
                className={`bg-yellow-600 w-fit px-3 py-1 hover:brightness-90 text-white mt-2`}
                onClick={() => handleSubmit(false)}
              >
                Actualizar
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <div>Paquete no encontrado</div>
      )}
    </Layout>
  );
};

export default Package;
