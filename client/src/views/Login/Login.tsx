import { useState } from "react";
import { UserI } from "../../interfaces/UserI";
import { setCookieToken } from "../../services/cookies/cookies";
import { useNavigate } from "react-router";
import Input from "../../componets/Input/Input";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<UserI>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    let message = "";
    if (!user.password) message = "El campo de contraseña está vacío";
    if (!user.username) message = "El campo de usuario está vacío";
    if (!user.username && !user.password)
      message = "Los campos de usuario y contraseña están vacíos";

    if (message) {
      alert(message);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.message == "User no exist") {
          alert("El usuario no existe");
        } else if (result.message == "Invalid password") {
          alert("La contraseña es incorrecta");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }
      setCookieToken(result);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-wrap justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border border-white p-4 flex flex-col items-center"
      >
        <h1 className="text-2xl text-center">Inicio de sesión</h1>
        <Input
          name="username"
          onChange={handleChange}
          title="Usuario"
          value={user.username}
        />
        <Input
          name="password"
          type="password"
          onChange={handleChange}
          title="Contraseña"
          value={user.password}
        />
        <button className="bg-yellow-600 w-fit px-3 py-1 m-2 hover:brightness-90">
          {isSubmitting ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
