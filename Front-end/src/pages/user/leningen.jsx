import react, { useEffect, useReducer, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbClockExclamation } from "react-icons/tb";
import { FaArrowsSpin } from "react-icons/fa6";
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
} from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { IoInformationCircleSharp } from "react-icons/io5";
import ProductInfoStudent from "../../components/ProductInfoStudent";
import axios from "axios";

const UserLeningen = () => {
  const [eyeToggleActief, setEyeToggleActief] = useState(true);
  const [eyeToggleTeLaat, setEyeToggleTeLaat] = useState(false);
  const [eyeToggleGeschiedenis, setEyeToggleGeschiedenis] = useState(false);
  const [actieveReservaties, setActieveReservaties] = useState([]);
  const [selectedReservatie, setSelectedReservatie] = useState({});
  const [teLaatReservaties, setTeLaatReservaties] = useState([]);
  const [allReservaties, setAllReservaties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const id = jwtDecode(token).UserId;

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
    const token = localStorage.getItem("authToken");

    const id = jwtDecode(token).UserId;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${id}/TelaatOnvolledig`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeLaatReservaties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const id = jwtDecode(token).UserId;

    axios
      .get(`http://localhost:8080/reservatie/gebruikerId=${id}`, {
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

  return (
    <main className="flex flex-col p-12 w-full flex-wrap gap-">
      <h1 className="flex h-auto text-4xl font-medium">
        <span className="border-b">Leningen</span>
      </h1>

      <div className="flex flex-col items-center gap-1 flex-wrap ">
        <div className="flex gap-8 h-44 mt-6 border ">
          <figure className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-red-100 flex-col justify-center gap-4">
            <BiTime className="size-16 ml-4 text-red-700" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">
                Te laat
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          <figure className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-blue-200 flex-col justify-center gap-4">
            <BiCircle className="size-16 ml-4 text-blue-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">Lopend</span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          <figure className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4">
            <BiCheckCircle className="size-16 ml-4 text-green-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-black font-nm text-">
                In orde
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
          <figure className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4">
            <BiBook className="size-16 ml-4 text-amber-600" />
            <h1 className="flex flex-col-space-y-7 ml-4">
              <span className="text-base text-Grijs font-nm text-">
                Voorboeking
              </span>
              <br />
              <span className="text-2xl text-black font-semibold"></span>
            </h1>
          </figure>
        </div>
      </div>
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
        {showModal && (
          <ProductInfoStudent
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
      </div>
      <hr className="my-4" />
      <div className="m-8">
        <div className="flex items-center gap-5">
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

export default UserLeningen;
