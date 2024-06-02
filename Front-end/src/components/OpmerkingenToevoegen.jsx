import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthToken";

const OpmerkingenToevoegen = ({ reservatie, closeModal }) => {
  const [products, setProducts] = useState(reservatie.producten);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [opmerking, setOpmerking] = useState("");
  const [token] = useState(localStorage.getItem("authToken"));

  useAuth();

  const handleAddOpmerking = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const opmerkingenTekst = selectedProducts
        .map(
          (product) =>
            `{Naam: ${product.productNaam}  - ID: ${product.productID}}`
        )
        .join("; ");
      setOpmerking(opmerkingenTekst);
    } else {
      document.getElementById("opmerking-telaat").value = "";
      setOpmerking(null);
    }
  }, [selectedProducts]);

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8080/reservatie/${reservatie.reservatieNr}/opmerking`,
        { opmerking },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Opmerking opgeslagen:", response.data);
        statusUpdate(reservatie.reservatieNr, "Onvolledig");
        closeModal();
      })
      .catch((error) => {
        console.error("Error bij opslaan van opmerking:", error);
      });
  };

  const statusUpdate = (reservatieNr, status) => {
    axios
      .put(
        `http://localhost:8080/reservatie/${reservatieNr}/status?newStatus=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Status gewijzigd:", response.data);
      })
      .catch((error) => {
        console.error("Error bij wijzigen status:", error);
      });
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg min-h-[60%] w-[60%] relative shadow-md">
        <h3
          className="text-lg leading-6 font-bold text-gray-900"
          id="modal-title"
        >
          Reservatie niet in orde
        </h3>
        <hr className="border border-gray-400" />
        <br />
        <hr />
        <div className="w-full h-80 overflow-auto mt-4 flex">
          <div className="flex flex-col w-1/2 p-4">
            <div className="opmerkingen-venster-links">
              <h1 className="font-bold text-xl">Nieuwe niet in orde</h1>
              <textarea
                id="opmerking-telaat"
                disabled
                className="w-full bg-gray-100 p-2 rounded-lg"
                value={
                  opmerking !== null && opmerking !== "" ? opmerking : "Leeg"
                }
              />
            </div>
            <div className="opmerkingen-venster-links mt-4">
              <h1 className="font-bold text-xl">Oude niet in orde</h1>
              <textarea
                id="opmerking-telaat"
                disabled
                className="w-full bg-gray-100 p-2 rounded-lg"
                value={
                  reservatie.opmerking !== null && reservatie.opmerking !== ""
                    ? reservatie.opmerking
                    : null
                }
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-4">
            <div className="opmerkingen-venster-rechts">
              <h2>Selecteer producten die niet in orde zijn</h2>
              <form>
                <ul>
                  {products.map((product) => (
                    <li key={product.id}>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => handleAddOpmerking(product)}
                          className="h-5 w-5 rounded-sm text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2">
                          {product.productNaam} - {product.productID}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
          <button
            onClick={() => {
              statusUpdate(reservatie.reservatieNr, "In orde");
              closeModal();
            }}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
          >
            Reservatie in orde
          </button>
        </div>

        <div className="absolute bottom-4 right-4 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={closeModal}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Sluiten
          </button>
          <button
            onClick={handleSave}
            disabled={selectedProducts.length === 0}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:
            ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpmerkingenToevoegen;
