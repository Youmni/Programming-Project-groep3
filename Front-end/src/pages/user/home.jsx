import React, { useEffect } from "react";
import { SiAudioboom } from "react-icons/si";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProductInfoStudent from "../../components/ProductInfoStudent";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useAuth } from "../../components/AuthToken";

import {
  FaCheckCircle,
  FaRegCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [eyeToggleActief, setEyeToggleActief] = useState(true);
  const [eyeToggleTeLaat, setEyeToggleTeLaat] = useState(false);
  const [actieveReservaties, setActieveReservaties] = useState([]);
  const [selectedReservatie, setSelectedReservatie] = useState({});
  const [teLaatReservaties, setTeLaatReservaties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8080/categorie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
        enqueueSnackbar("Categorieën opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error", { variant: "error" });
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      });
  }, []);


  useEffect(() => {
    const id = jwtDecode(token).sub;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${id}/status=Bezig`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setActieveReservaties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
  const id = jwtDecode(token).sub;

    axios
      .get(
        `http://localhost:8080/reservatie/gebruikerId=${id}/TelaatOnvolledig`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTeLaatReservaties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex flex-col p-12">
      <div className="flex w-full flex-col h-auto gap-7">
        <h1 className="h-auto w-full text-center text-4xl font-medium">
          Onze Categorieen
        </h1>
        <div className="flex flex-wrap w-auto gap-8 h-auto justify-center">
          {categories.map((categorie) => (
            <Link
              to={`/inventaris/${categorie.categorieNr}`}
              className="flex flex-col h-[170px] w-[130px] border-2 rounded-xl items-center justify-center gap-6 hover:bg-gray-100 transform transition-transform duration-250 hover:scale-110"
              key={categorie.categorieNr}
            >
              <SiAudioboom className="size-14" />
              <h2 className="text-3xl font-md">{categorie.categorieNaam}</h2>
            </Link>
          ))}
          <Link
            to={`/inventaris`}
            className="w-full flex justify-center items-center mr-6 mt-5 hover:underline text-xl"
          >
            <p>Ga naar inventaris</p>
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
      <hr className="my-4" />

      <div className="m-8">
        <div className="flex items-center gap-5">
          <h1 className="text-xl font-semibold">
            Actieve reservaties
            <sup
              className={
                actieveReservaties.length ? "text-red-600" : "text-green-600"
              }
            >
              {actieveReservaties.length}
            </sup>
          </h1>
          <span
            onClick={() => setEyeToggleActief(!eyeToggleActief)}
            className="cursor-pointer"
          >
            {eyeToggleActief ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="flex w-auto  h-auto">
          {eyeToggleActief && (
            <div className="w-full h-80 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400">
                    <th scope="col" className="px-1 font-semibold text-center">
                      Reservatie ID
                    </th>
                    <th
                      scope="col"
                      className="px-1 font-semibold text-center py-4"
                    >
                      Product details
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
                  {actieveReservaties.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen actieve reservaties
                      </td>
                    </tr>
                  ) : (
                    <>
                      {actieveReservaties.map((reservatie) => (
                        <tr
                          key={reservatie.reservatieNr}
                          className="text-center space-y-4 border-2"
                        >
                          <td className="px-2">{reservatie.reservatieNr}</td>
                          <td className="px-2 flex justify-center">
                            <div className=" flex flex-col justify-center items-center">
                              {reservatie.producten.map((product) => (
                                <div key={product.productNr}>
                                  <p>{product.productNaam}</p>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-2">{reservatie.afhaalDatum}</td>
                          <td className="px-2">{reservatie.retourDatum}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showModal && (
          <ProductInfoStudent
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
      </div>

      <hr className="my-10 border-gray-200" />

      <div className="m-8">
        <div className="flex justify-center flex-col gap-5">
          <h1 className="text-xl font-semibold">Voorboekingen</h1>
          <div className="flex w-full justify-center">
            <button
              className="text-blue-500 hover:text-blue-700 cursor-pointer underline"
              onClick={() => navigate("/leningen")}
            >
              Ga naar Voorboekingen
            </button>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="m-8">
        <div className="flex items-center gap-5">
          <h1 className="text-xl font-semibold">
            Te laat/ Onvolledig
            <sup
              className={
                teLaatReservaties.length ? "text-red-600" : "text-green-600"
              }
            >
              {teLaatReservaties.length}
            </sup>
          </h1>
          <span
            onClick={() => setEyeToggleTeLaat(!eyeToggleTeLaat)}
            className="cursor-pointer"
          >
            {eyeToggleTeLaat ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="flex w-auto  h-auto">
          {eyeToggleTeLaat && (
            <div className="w-full h-80 overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400">
                    <th scope="col" className="px-1 font-semibold text-center">
                      Reservatie ID
                    </th>
                    <th
                      scope="col"
                      className="px-1 font-semibold text-center py-4"
                    >
                      Product details
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
                  {teLaatReservaties.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen geschiedenis
                      </td>
                    </tr>
                  ) : (
                    teLaatReservaties.map((reservatie) => (
                      <tr
                        key={reservatie.reservatieNr}
                        className="text-center space-y-4 border-2"
                      >
                        <td className="px-2">{reservatie.reservatieNr}</td>
                        <td className="px-2 flex justify-center">
                            <div className=" flex flex-col justify-center items-center">
                              {reservatie.producten.map((product) => (
                                <div key={product.productNr}>
                                  <p>{product.productNaam}</p>
                                </div>
                              ))}
                            </div>
                          </td>
                        <td className="px-2">{reservatie.afhaalDatum}</td>
                        <td className="px-2">{reservatie.retourDatum}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showModal && (
          <ProductInfoStudent
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
      </div>

      <hr className="my-4" />
    </main>
  );
};

export default Home;
