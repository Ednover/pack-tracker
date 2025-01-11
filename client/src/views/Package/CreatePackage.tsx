import { useState } from "react";
import Input from "../../componets/Input/Input";
import Layout from "../../componets/Layout/Layout";
import { PackageFormI } from "../../interfaces/PackageI";
import { useNavigate } from "react-router-dom";
import { getCookieToken } from "../../services/cookies/cookies";

const CreatePackage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packageData, setPackageData] = useState<PackageFormI>({
    description: "",
    size: "",
    receiver: {
      email: "",
      name: "",
    },
  });

  const handleChangePackage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value,
    });
  };

  const handleChangeReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      receiver: {
        ...packageData.receiver,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    let message = "";
    if (!packageData.receiver.email)
      message = "El campo de correo electrónico está vacío";
    if (!packageData.receiver.name) message = "El campo de nombre está vacío";
    if (!packageData.receiver.name && !packageData.receiver.email)
      message = "Los campos de nombre y correo electrónico están vacíos";
    if (!packageData.size) message = "El campo de tamaño está vacío";
    if (!packageData.description)
      message = "El campo de descripción está vacío";
    if (!packageData.description && !packageData.size)
      message = "Los campos de descripción y tamaño están vacíos";

    if (message) {
      alert(message);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/admin/packages/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookieToken()}`,
          },
          body: JSON.stringify(packageData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("El paquete fue creado correctamente");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl">Crear paquete</h1>
      <form onSubmit={handleSubmit}>
        <h3 className="text-center text-xl font-bold">
          Información del paquete
        </h3>
        <Input
          name="description"
          onChange={handleChangePackage}
          title="Descripción"
          value={packageData.description}
        />
        <Input
          name="size"
          onChange={handleChangePackage}
          title="Tamaño"
          value={packageData.size}
        />
        <h3 className="text-center text-xl font-bold mt-2">
          Información del receptor
        </h3>
        <Input
          name="name"
          onChange={handleChangeReceiver}
          title="Nombre"
          value={packageData.receiver.name}
        />
        <Input
          name="email"
          type="email"
          onChange={handleChangeReceiver}
          title="Correo electrónico"
          value={packageData.receiver.email}
        />
        <div className="flex justify-center">
          <button className="bg-green-600 w-fit h-fit px-4 py-1 hover:brightness-90 mt-3">
            {isSubmitting ? "Cargando..." : "Crear"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreatePackage;
