import { Route, Routes } from "react-router";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Package from "./views/Package/Package";
import RequireAuth from "./componets/RequireAuth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/package/:id" element={<Package />} />
      </Route>
    </Routes>
  );
}

export default App;
