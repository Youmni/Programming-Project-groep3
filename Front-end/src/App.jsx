import Dashboard from "./pages/admin/dashboard";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React from "react";
import AdminSideBar from "./components/AdminSideBar";
import NavBar from "./components/NavBar";
import AdminInventaris from "./pages/admin/inventaris";
import Gebruikers from "./pages/admin/gebruikers";
import "./App.css";
import Home from "./pages/user/home";
import Product_toevoegen from "./pages/admin/product_toevoegen";
import Leningen from "./pages/admin/leningen";
import Login from "./pages/login";
import Inventaris from "./pages/user/inventaris";
import Footer from "./pages/footer";
import FAQ from "./pages/user/FAQ";
import UserLeningen from "./pages/user/leningen";
import InventarisCategorie from "./pages/user/inventarisCategorie";
import Winkelmandje from "./pages/user/winkelmandje";
import { WinkelMandjeProvider } from "./contexts/winkelmandjeContext";
import Register from "./components/Register";
import ProductModel_toevoegen from "./pages/admin/productModel_toevoegen";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductModel_wijzigen from "./pages/admin/productModel_wijzigen";

const App = () => {
  const location = useLocation();
  

  if (location.pathname === "/"){
    return <Login />;
  } 

  return (
    <div className="flex flex-col min-h-screen max-w-screen">
      <Routes scrollRestoration={true}>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute component={AdminRoutes} allowedRoles={["Admin"]} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute
              component={UserRoutes}
              allowedRoles={["Student", "Docent", "Admin"]}
            />
          }
        />

        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
    </div>
  );
};

const AdminRoutes = () => {

  return (
    <div className="flex">
      <AdminSideBar />
      <Routes scrollRestoration={true}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventaris" element={<AdminInventaris />} />
        <Route path="/gebruikers" element={<Gebruikers />} />
        <Route
          path="/inventaris/product_toevoegen"
          element={<Product_toevoegen />}
        />
        <Route
          path="/inventaris/productModel_toevoegen"
          element={<ProductModel_toevoegen />}
        />
        <Route path="/leningen" element={<Leningen />} />
        <Route path="/inventaris/wijzigen/:productModelNr" element={<ProductModel_wijzigen />} />
      </Routes>
    </div>
  );
};

const UserRoutes = () => {
  return (
    <WinkelMandjeProvider>
      <div className="flex flex-col flex-grow">
        <NavBar />
        <div className="flex-grow">
          <Routes scrollRestoration={true}>
            <Route path="/home" element={<Home />} />
            <Route path="/inventaris/*" element={<InventarisRoutes />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/leningen" element={<UserLeningen />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </WinkelMandjeProvider>
  );
};

const InventarisRoutes = () => {
  return (
    <div>
      <Routes scrollRestoration={true}>
        <Route path="/" element={<Inventaris />} />
        <Route path="/:categorieNr" element={<InventarisCategorie />} />
      </Routes>
    </div>
  );
};

const Forbidden = () => {
  return <div className="flex justify-center items-center h-screen"><p className="text-5xl">403 Forbidden</p></div>;
};

export default App;
