import React, { useState } from "react";
import BackupImage from "../assets/backup.jpg";

const ProductInfoStudent = ({ reservatie, closeModal }) => {
  const [products, setProducts] = useState(reservatie);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg min-h-[35%] w-1/4 relative shadow-md">
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
              <span className="h-8 w-8 rounded-full border-2">
                <img
                  src={
                    product.productModelNr.productModelFoto
                      ? `/src/assets/ProductModelFotos/${product.productModelNr.productModelFoto}`
                      : BackupImage
                  }
                  alt=""
                />
              </span>
              <p className="text-left">{product.productNaam}</p>
              <span className="text-center">ID: #{product.productID}</span>
              <p className="text-center">
                Merk: {product.productModelNr.productModelMerk}
              </p>
            </div>
          ))}
          <hr />
        </div>
        <div className="bg-gray-50 absolute bottom-4 right-4 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
  );
};

export default ProductInfoStudent;
