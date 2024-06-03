import React, { useState } from "react";
import { MdOutlineBrokenImage } from "react-icons/md";
import BeschadigingPopup from "./BeschadigingPopup";
import { useAuth } from "./AuthToken";

const ProductDetailsReservatie = ({ reservatie, closeModal }) => {
  const [products, setProducts] = useState(reservatie);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useAuth();

  const openProductBeschadiging = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setShowModal(true);
  };

  const handleProductClick = (product) => {
    openProductBeschadiging(product);
  };


  
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>
        <span
          className=" sm:inline-block sm:align-middle sm:h-screen"
        ></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white p-4 sm:p-6 sm:pb-4">
            <h3
              className="text-lg leading-6 font-bold text-gray-900"
              id="modal-title"
            >
              Product info
            </h3>
            <hr className="border border-gray-400" />
            <br />
            <div className="mt-2">
              {products.producten.map((product) => (
                <div
                  key={product.productID}
                  className="flex flex-row justify-between items-center h-full mb-2"
                >
                  <p className="text-left">{product.productNaam}</p>
                  <span className="text-center">ID: #{product.productID}</span>

                  <button className="p-1 bg-red-900 rounded-lg text-white transform transition-transform duration-250 hover:scale-110">
                    <MdOutlineBrokenImage
                      onClick={() => handleProductClick(product)}
                      className="size-6"
                    />
                  </button>
                </div>
              ))}
              <hr />
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              type="button"
              className="mt-3 w-full flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sluiten
            </button>
          </div>
        </div>
        {showModal && (<div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center overflow-y-hidden">
        <BeschadigingPopup productObject={selectedProduct} onClose={closeModal} />
      </div>)}
      </div>
    </div>
  );
};


export default ProductDetailsReservatie;