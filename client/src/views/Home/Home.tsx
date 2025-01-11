import { useState } from "react";
import { PackageI } from "../../interfaces/PackageI";
import Layout from "../../componets/Layout/Layout";
import PackageInfo from "../../componets/PackageInfo/PackageInfo";

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
        `${import.meta.env.VITE_API}/receiver/package/${trackingID}`
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
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
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
          <PackageInfo packageData={packageData} />
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Home;
