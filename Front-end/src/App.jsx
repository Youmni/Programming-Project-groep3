import Dashboard from "./pages/admin/dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import AdminSideBar from "./components/AdminSideBar";
import NavBar from "./components/NavBar";
import Inventaris from "./pages/admin/inventaris";
import Gebruikers from "./pages/admin/gebruikers";
import "./App.css";
import Home from "./pages/user/home";
import Product_toevoegen from "./pages/admin/product_toevoegen";
import Leningen from "./pages/admin/leningen";
import Login from "./pages/login";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (location.pathname === "/") {
    // Render the login page without any navigation bar
    return <Login />;
  }

  return (
    <div className="flex">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <div className="flex flex-grow">
      <AdminSideBar />
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/inventaris" element={<Inventaris />} />
        <Route path="/gebruikers" element={<Gebruikers />} />
        <Route
          path="/inventaris/product_toevoegen"
          element={<Product_toevoegen />}
        />
        <Route path="/leningen" element={<Leningen />} />
      </Routes>
    </div>
  );
};

const UserRoutes = () => {
  return (
    <div className="flex flex-col flex-grow">
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};
//test
export default App;
