import { Link, useNavigate } from "react-router";
import { getCookieToken, removeCookieToken } from "../../services/cookies/cookies";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookieToken();
    navigate("/login");
  }

  return (
    <header className="max-w-[1440px] mx-auto p-4 flex justify-between">
      <p>Pack Tracker</p>
      {getCookieToken() ? (
        <button className="bg-gray-600 px-3 py-1 hover:brightness-90" onClick={handleLogout}>
          Cerrar sesión
        </button>
      ) : (
        <Link
          to={"/login"}
          className="bg-gray-600 px-3 py-1 hover:brightness-90"
        >
          Iniciar sesión
        </Link>
      )}
    </header>
  );
};

export default Navbar;
