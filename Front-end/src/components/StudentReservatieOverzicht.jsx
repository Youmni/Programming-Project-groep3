import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoInformationCircleSharp } from "react-icons/io5";
import ProductInfoStudent from "./ProductInfoStudent";
import { useAuth } from "./AuthToken";

const StudentReservatieOverzicht = ({ url, closeModal }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [reservatie, setReservatie] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservatie, setSelectedReservatie] = useState(null);
  useAuth();
  
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReservatie(response.data);
      })
      .catch((error) => {
        console.error(
          "Er is iets fout gegaan bij het ophalen van de gebruikers",
          error
        );
      });
  }, []);

  const openModal = (reservatie) => {
    setSelectedReservatie(reservatie);
    setShowModal(true);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg min-h-[70%] w-[80%] relative shadow-md">
        <h3
          className="text-lg leading-6 font-bold text-gray-900"
          id="modal-title"
        >
          Reservatie info
        </h3>
        <hr className="border border-gray-400" />
        <br />
        <hr />
        <div className="w-full h-80 overflow-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400">
                <th scope="col" className="px-1 font-semibold text-center">
                  Reservatie ID
                </th>
                <th scope="col" className="px-1 font-semibold text-center py-4">
                  Product details
                </th>
                <th scope="col" className="px-1 font-semibold text-center">
                  Boekingdatum
                </th>
                <th scope="col" className="px-1 font-semibold text-center">
                  Afhaaldatum
                </th>
                <th scope="col" className="px-1 font-semibold text-center">
                  Retourdatum
                </th>
              </tr>
            </thead>
            <tbody>
              {reservatie.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="bg-green-600 rounded p-4 text-white text-center"
                  >
                    Geen reservaties te laat of onvolledig zijn
                  </td>
                </tr>
              ) : (
                reservatie.map((reservatie) => (
                  <tr
                    key={reservatie.reservatieNr}
                    className="text-center space-y-4"
                  >
                    <td className="px-2">{reservatie.reservatieNr}</td>
                    <td className="px-2 flex justify-center">
                      <div>
                        <IoInformationCircleSharp
                          onClick={() => openModal(reservatie)}
                          className="w-8 h-8 p-1 rounded-full bg-black text-white cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-2">{reservatie.boekingDatum}</td>
                    <td className="px-2">{reservatie.afhaalDatum}</td>
                    <td className="px-2">{reservatie.retourDatum}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
      {showModal && (
        <ProductInfoStudent
          reservatie={selectedReservatie}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default StudentReservatieOverzicht;
