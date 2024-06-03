import react, { act, useEffect, useReducer, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbClockExclamation } from "react-icons/tb";
import { FaArrowsSpin } from "react-icons/fa6";
import { enqueueSnackbar } from "notistack";
import ReservatieProductReserveren from "../../components/ReservatieProductenReserveren";
import { useAuth } from "../../components/AuthToken";
import { AiOutlineClose } from 'react-icons/ai';

import {
  FaCheckCircle,
  FaRegCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  BiCheckCircle,
  BiCircle,
  BiPauseCircle,
  BiArrowToRight,
  BiCheck,
  BiTime,
  BiRun,
  BiTimeFive,
  BiBook,
  BiCross
} from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { IoInformationCircleSharp } from "react-icons/io5";
import ProductInfoStudent from "../../components/ProductInfoStudent";
import axios from "axios";
import StudentReservatieOverzicht from "../../components/StudentReservatieOverzicht";

const UserLeningen = () => {
  const [eyeToggleActief, setEyeToggleActief] = useState(true);
  const [eyeToggleTeLaat, setEyeToggleTeLaat] = useState(false);
  const [eyeToggleGeschiedenis, setEyeToggleGeschiedenis] = useState(false);
  const [eyeToggleVoorboeking, setEyeToggleVoorboeking] = useState(false);
  const [actieveReservaties, setActieveReservaties] = useState([]);
  const [selectedReservatie, setSelectedReservatie] = useState({});
  const [teLaatReservaties, setTeLaatReservaties] = useState([]);
  const [allReservaties, setAllReservaties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [voorboekingen, setVoorboekingen] = useState([]);
  const [gebruikerID, setGebruikerID] = useState(localStorage.getItem("authToken").userId);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useAuth();

  useEffect(() => {


    const decodedToken = jwtDecode(token).sub;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${decodedToken}/status=Bezig`, {
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
    const decodedToken = jwtDecode(token).sub;

    axios
      .get(
        `http://localhost:8080/reservatie/gebruikerId=${decodedToken}/TelaatOnvolledig`,
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

  useEffect(() => {
    const decodedToken = jwtDecode(token).sub;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${decodedToken}/status=Voorboeking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setVoorboekingen(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [voorboekingen]);

  useEffect(() => {
    const decodedToken = jwtDecode(token).sub;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${decodedToken}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllReservaties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const openModal = (reservatie) => {
    setSelectedReservatie(reservatie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAnnuleren = (id) => {
    axios
      .delete(
        `http://localhost:8080/reservatie/verwijder/id=${id}`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Reservatie is succesvol geannuleerd!", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };

  return (
    <main className="flex flex-col p-4 lg:p-12 w-full gap-4">
      <h1 className="flex h-auto text-4xl font-medium">
        <span className="border-b">Leningen</span>
      </h1>

      <div className="flex flex-col items-center gap-1 flex-wrap ">
      <h2 className="mt-8 font-bold text-xl">Shortcuts</h2>
        <div className="flex gap-8 h-auto  mt-6 flex-wrap justify-center">
          <a href="#telaat-onvolledig">
          <figure
            className="flex h-44  w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-red-100 flex-col justify-center gap-4"
          >
            <BiTime className="size-16 ml-4 text-red-700" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">
                Te laat / Onvolledig
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          </a>
          <a href="#lopend">
          <figure
            className="flex h-44  w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-blue-200 flex-col justify-center gap-4"
          >
            <BiCircle className="size-16 ml-4 text-blue-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">Actief</span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          </a>
          <a href="#geschiedenis">
          <figure
            className="flex h-44  w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4"
          >
            <BiCheckCircle className="size-16 ml-4 text-green-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-black font-nm text-">
                Geschiedenis
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          </a>
          <a href="#voorboeking">
          <figure
            className="flex h-44  w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4"
          >
            <BiBook className="size-16 ml-4 text-amber-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">
                Voorboeking
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          </a>
        </div>
      </div>
      <div className="m-8">
        <div id="voorboeking" className="flex items-center gap-5">
          <h1 className="text-xl font-semibold">
            Voorboekingen
            <sup
              className={
                voorboekingen.length ? "text-red-600" : "text-green-600"
              }
            >
              {voorboekingen.length}
            </sup>
          </h1>
          <span
            onClick={() => setEyeToggleVoorboeking(!eyeToggleVoorboeking)}
            className="cursor-pointer"
          >
            {eyeToggleVoorboeking ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="flex w-auto  h-auto">
          {eyeToggleVoorboeking ? (
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
                    <th scope="col" className="px-1 font-semibold text-center">
                      Annuleren
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voorboekingen.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen reservaties die vandaag worden afgehaald
                      </td>
                    </tr>
                  ) : (
                    voorboekingen.map((reservatie) => (
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
                        <td className="px-2">
                          <div className="flex justify-center items-start">
                          <AiOutlineClose onClick={()=>handleAnnuleren(reservatie.reservatieNr)} className="bg-red-400 p-1 text-3xl text-white cursor-pointer rounded-lg shadow-md"/>
                          </div>
                          </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="m-8">
        <div id="lopend" className="flex items-center gap-5">
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
          {eyeToggleActief ? (
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
                        Geen reservaties die vandaag worden afgehaald
                      </td>
                    </tr>
                  ) : (
                    actieveReservaties.map((reservatie) => (
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
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="m-8">
        <div id="telaat-onvolledig" className="flex items-center gap-5">
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
          {eyeToggleTeLaat ? (
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
                        Geen reservaties te laat of onvolledig zijn
                      </td>
                    </tr>
                  ) : (
                    actieveReservaties.map((reservatie) => (
                      <div className="w-full h-80 overflow-auto">
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
                      </div>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="m-8">
        <div id="geschiedenis" className="flex items-center gap-5">
          <h1 className="text-xl font-semibold">
            Geschiedenis
            <sup
              className={
                allReservaties.length ? "text-red-600" : "text-green-600"
              }
            >
              {allReservaties.length}
            </sup>
          </h1>
          <span
            onClick={() => setEyeToggleGeschiedenis(!eyeToggleGeschiedenis)}
            className="cursor-pointer"
          >
            {eyeToggleGeschiedenis ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="flex w-auto  h-auto">
          {eyeToggleGeschiedenis ? (
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
                    <th scope="col" className="px-1 font-semibold text-center">
                      Opnieuw reserveren
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allReservaties.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen geschiedenis
                      </td>
                    </tr>
                  ) : (
                    allReservaties.map((reservatie) => (
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
                        <td className="px-2 flex justify-center">
                          <div>
                            <IoInformationCircleSharp
                              onClick={() => openModal(reservatie)}
                              className="w-7 h-7 p-1 rounded-full bg-black text-white cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
        {showModal && (
          <ReservatieProductReserveren
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
      </div>
      <hr className="my-4" />
    </main>
  );
};

export default UserLeningen;
