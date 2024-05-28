import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBasketShopping } from "react-icons/fa6";
import ReserveringForm from "../pages/user/reserveringform"; 

const ChooseProduct = ({ productModelNr, closeModal }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reserverenOpen, setReserverenOpen] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
        variant: "error",
      });
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/product/model=${productModelNr}/status?Beschikbaar&Gereserveerd`, {
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
  }, [productModelNr]);

  const openReserveren = (product) => {
    console.log("Product clicked reservatie: ", product)
    setSelectedProduct(product);
    setReserverenOpen(true);
    console.log(reserverenOpen)
  };

  const handleProductClick = (product) => {
    console.log("Product clicked: ", product)
    openReserveren(product);
  };

  if(reserverenOpen){
    return <ReserveringForm closeModal={closeModal} product={selectedProduct}/>
  } ;

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg leading-6 font-bold text-gray-900"
              id="modal-title"
            >
              Kies een product
            </h3>
            <hr className="border border-gray-400" />
            <br />
            <div className="mt-2">
              {products.map((product) => (
                <div
                  key={product.productID}
                  className="flex flex-row justify-between items-center h-full mb-2"
                >
                  <p className="text-left w-1/3">{product.productNaam}</p>
                  <span className="text-center w-1/3">{product.status}</span>
                  <FaBasketShopping
                    onClick={() => handleProductClick(product)}
                    className="text-right w-8 h-8 cursor-pointer"
                  />
                </div>
              ))}
              <hr />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseProduct;
