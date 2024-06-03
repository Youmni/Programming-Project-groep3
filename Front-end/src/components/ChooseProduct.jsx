import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiShoppingBag } from "react-icons/bi";
import ReserveringForm from "../pages/user/reserveringform"; 
import { useAuth } from "./AuthToken";

const ChooseProduct = ({ productModelNr, closeModal, productModelFoto }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reserverenOpen, setReserverenOpen] = useState(false);
  const [token] = useState(localStorage.getItem("authToken"));

  useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/model=${productModelNr}/status?statussen=Beschikbaar&Gereserveerd`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [productModelNr, token]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const openReserveren = (product) => {
    setSelectedProduct(product);
    setReserverenOpen(true);
  };

  const handleProductClick = (product) => {
    openReserveren(product);
  };

  if (reserverenOpen) {
    return <ReserveringForm closeModal={closeModal} product={selectedProduct} />;
  }

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Beschikbaar":
        return "text-green-500";
      case "Gepauzeerd":
        return "text-blue-500";
      case "Beschadigd":
        return "text-red-700";
      case "Gereserveerd":
        return "text-yellow-500";
      default:
        return "text-black";
    }
  };

  return (
    <main
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg lg:w-1/3 md:w-2/3 sm:w-4/5 w-full h-3/4 relative shadow-md">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl">Kies een product</h1>
        </div>
        <div className="absolute top-4 right-4 w-16 h-16">
          <img
            src={`/src/assets/ProductModelFotos/${productModelFoto}`}
            alt="Product"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="mt-10 h-3/4 overflow-auto">
          {products.map((product) => (
            <div
              key={product.productID}
              className="flex justify-between items-center h-auto p-2 border-b"
            >
              <p className="text-left w-1/2 truncate">{product.productNaam}</p>
              <span className={`text-center w-1/4 ${getStatusColor(product.status)}`}>{product.status}</span>
              <BiShoppingBag
                onClick={() => handleProductClick(product)}
                className="text-right w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
              />
            </div>
          ))}
        </div>
        <div className="sm:flex sm:flex-row-reverse justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="text-white h-14 w-20 border rounded-xl bg-blue-800 flex justify-center items-center p-2 shadow-lg hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sluiten
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChooseProduct;
