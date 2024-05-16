import Dashboard from "./pages/admin/dashboard";
import { Routes, Route, useLocation } from "react-router-dom";
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

const App = () => {
 const location = useLocation();

  if(location.pathname === "/") return <Login />

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <div className="flex w-screen">
      <AdminSideBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route  path="/" element={<Dashboard />} />
        <Route path="/inventaris" element={<AdminInventaris />} />
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
    <div className="flex flex-col min-h-screen">
      <NavBar />
        <Winkelmandje />
      <div className="flex-grow">
        <Routes>  
          <Route path="/home" element={<Home />} />
          <Route path="/inventaris/*" element={<InventarisRoutes />} />
          <Route path="/FAQ" element={<FAQ />}/>
          <Route path="/leningen" element={<UserLeningen />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const InventarisRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Inventaris />} />
        <Route path="/:categorie" element={<InventarisCategorie />} />
      </Routes>
    </div>
  );

};


export default App;
