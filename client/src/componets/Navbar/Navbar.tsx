import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="max-w-[1440px] mx-auto p-4 flex justify-between">
      <p>Pack Tracker</p>
      <Link to={"/login"} className="bg-gray-600 px-3 py-1 hover:brightness-90">
        Iniciar sesión
      </Link>
    </header>
  );
};

export default Navbar;
