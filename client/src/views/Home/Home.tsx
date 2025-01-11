import { useState } from "react";
import Navbar from "../../componets/Navbar/Navbar";
import { PackageI } from "../../interfaces/PackageI";
import { formatDate } from "../../utils/formatDate";

const Home = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingID, setTrackingID] = useState("");
  const [packageData, setPackageData] = useState<PackageI | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTrackingID(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (!trackingID) {
      alert("El campo de trackingID está vacío");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/receiver/package/${trackingID}`
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
      console.log(result); //set data
      setPackageData(result);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-6 justify-center items-center lg:mt-10 md:mt-8 mt-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-2xl">Rastrea tu paquete aquí</h2>
          <input
            className="max-w-80 w-full px-2 py-1"
            type="text"
            placeholder="Ingresar el número de rastreo"
            name="trackingID"
            value={trackingID}
            onChange={handleChange}
          />
          <button
            className="bg-yellow-600 w-fit px-3 py-1 hover:brightness-90"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Cargando..." : "Rastrear"}
          </button>
        </div>
        {packageData ? (
          <div className="max-w-4xl md:w-full md:mx-auto border border-white p-3 mx-2">
            <b className="text-xl">{packageData.description}</b>
            <p>{packageData.size}</p>
            <div className="w-fit mx-auto">
              {packageData.tracking.history.map((object, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 justify-center mb-1"
                >
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
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;
