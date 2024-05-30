import react, { useEffect, useReducer, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import axios from "axios";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FaCirclePause } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdOutlineAddCircle } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import Spinner from "react-bootstrap/esm/Spinner";
import Leningen from "./leningen";
import {BiCheckCircle,BiCircle,BiPauseCircle,BiArrowToRight,BiCheck, BiRun,BiTimeFive,BiBook,} from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductDetailsReservatie from "../../components/ProductDetailsReservatie";
import Inventaris from "./inventaris";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [reservatiesAfhalen, setReservatiesAfhalen] = useState([]);
  const [reservatiesRetourneren, setReservatiesRetourneren] = useState([]);
  const [reservatiesTeLaatOnvolledig, setReservatiesTeLaatOnvolledig] =
    useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservatie, setSelectedReservatie] = useState(null);
  const [eyeToggleRetour, seyEyeToggleRetour] = useState(true);
  const [eyeToggleAfhaal, setEyeToggleAfhaal] = useState(true);
  const [eyeToggleTeLaatOnvolledig, setEyeToggleTeLaatOnvolledig] =
    useState(true);
  const [inventarisAantallen, setInventarisAantallen] = useState({
    beschikbaar: "...",
    gereserveerd: "...",
    gepauzeerd: "...",
  });

  const [leningAantallen, setLeningAantallen] = useState({
    inOrde: "...",
    bezig: "...",
    teLaat: "...",
    voorboeking: "...",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/product/status-aantallen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const nieuweAantallen = {
          beschikbaar: 0,
          gereserveerd: 0,
          gepauzeerd: 0,
        };

        data.forEach((item) => {
          if (item.status.toLowerCase() === "beschikbaar") {
            nieuweAantallen.beschikbaar = item.aantal;
          } else if (item.status.toLowerCase() === "gereserveerd") {
            nieuweAantallen.gereserveerd = item.aantal;
          } else if (item.status.toLowerCase() === "gepauzeerd") {
            nieuweAantallen.gepauzeerd = item.aantal;
          }
        });

        console.log(response.data)
        setInventarisAantallen(nieuweAantallen);
      })
      .catch((error) => {
        console.error("Error fetching status counts:", error);
      });
  }, [inventarisAantallen]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/reservatie/status-aantallen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const nieuweAantallen = {
          inOrde: 0,
          bezig: 0,
          teLaat: 0,
          voorboeking: 0,
        };

        data.forEach((item) => {
          if (item.status.toLowerCase() === "in orde") {
            nieuweAantallen.inOrde = item.aantal;
          } else if (item.status.toLowerCase() === "bezig") {
            nieuweAantallen.bezig = item.aantal;
          } else if (item.status.toLowerCase() === "te laat") {
            nieuweAantallen.teLaat = item.aantal;
          } else if (item.status.toLowerCase() === "voorboeking") {
            nieuweAantallen.voorboeking = item.aantal;
          }
        });

        setLeningAantallen(nieuweAantallen);
      })
      .catch((error) => {
        console.error("Error fetching status counts:", error);
      });
  }, [leningAantallen]);

  // useEffect(() => {

  //   if (!token) {
  //     enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
  //       variant: "error",
  //     });
  //     navigate("/login");
  //     return;
  //   }
  // }, []);

  const datumVandaag = () => {
    const vandaag = new Date();
    const dd = String(vandaag.getDate()).padStart(2, "0");
    const mm = String(vandaag.getMonth() + 1).padStart(2, "0");
    const yyyy = vandaag.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/reservatie/retourdatum=${datumVandaag()}/status=Bezig`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReservatiesRetourneren(response.data);
      })
      .catch((error) => {
        // to-do
      });
  }, [reservatiesRetourneren]);

  useEffect(() => {
    const status = "Te laat&Onvolledig";

    axios
      .get(`http://localhost:8080/reservatie/status?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReservatiesTeLaatOnvolledig(response.data);
      })
      .catch((error) => {
        // to-do
      });
  }, [reservatiesTeLaatOnvolledig]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/reservatie/afhaaldatum=${datumVandaag()}/status=Voorboeking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReservatiesAfhalen(response.data);
      })
      .catch((error) => {
        // to-do
      });
  }, [reservatiesAfhalen]);

  const openModal = (reservatie) => {
    setSelectedReservatie(reservatie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleTerugbreng = (id) => {
    console.log(id);

    axios
      .put(
        `http://localhost:8080/reservatie/${id}/status?newStatus=In orde`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Reservatie is succesvol afgerond", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };

  const handleUitleen = (id) => {
    console.log(id);

    axios
      .put(
        `http://localhost:8080/reservatie/${id}/status?newStatus=Bezig`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Reservatie is succesvol gestart", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };

  // de onclick methodes die nodig zijn voor de tegels

  const inventarisBeschikbaar = () => {
    const status = "Beschikbaar";
    navigate("/admin/inventaris", { state: { url: `http://localhost:8080/productmodel/product/status=${status}`} });

  };
  const inventarisGereserveerd = () => {
    const status = "Gereserveerd";
    navigate("/admin/inventaris", { state: { url: `http://localhost:8080/productmodel/product/status=${status}`} });
  };
  const inventarisGepauzeerd = () => {
    const status = "Gepauzeerd";
    navigate("/admin/inventaris", { state: { url: `http://localhost:8080/productmodel/product/status=${status}`} });
  };

  const leningInOrde = () => {
    const status = "In orde";
    navigate("/admin/leningen", { state: { url: `http://localhost:8080/reservatie/status?status=${status}`} });

  };
  const leningBezig = () => {
    const status = "Bezig";
    navigate("/admin/leningen", { state: { url: `http://localhost:8080/reservatie/status?status=${status}`} });

  };
  const leningTeLaat = () => {
    const status = "Te laat";
    navigate("/admin/leningen", { state: { url: `http://localhost:8080/reservatie/status?status=${status}`} });

  };
  const leningVoorboeking = () => {
    const status = "Voorboeking";
    navigate("/admin/leningen", { state: { url: `http://localhost:8080/reservatie/status?status=${status}`} });
  };

  return (
    <div className="top-0 flex-grow">
      <main className=" p-10">
        <h1 className="text-4xl font-bold underline">Dashboard</h1>
        <div className="flex items-center gap-2 mt-10">
          <RxDashboard className="text-rood size-5" />
          <breadcrumb-item>Dashboard</breadcrumb-item>
        </div>
        <div className="flex mt-8 justify-center">
          <ul className="flex justify-center h-auto w-full">
            <li className="flex w-1/4 h-full items-center border-r gap-4 justify-center">
              <FaBoxes className="size-10 text-yellow-300" />
              <h1 className="flex flex-col -space-y-7">
                <span className="text-sm text-[rgb(0,0,0,0.6)] font-semibold ">
                  Aantal producten
                </span>
                <br />
                <span className="text-2xl text-black font-bold">4000</span>
              </h1>
            </li>
            <li className="flex w-1/4 h-full items-center border-r gap-4 justify-center">
              <FaBoxes className="size-10 text-yellow-300" />
              <h1 className="flex flex-col -space-y-7">
                <span className="text-sm text-[rgb(0,0,0,0.6)]  font-semibold ">
                  Aantal Categorieen
                </span>
                <br />
                <span className="text-2xl text-black font-bold">4000</span>
              </h1>
            </li>
            <li className="flex w-1/4 h-full items-center border-r gap-4 justify-center">
              <FaBoxes className="size-10 text-yellow-300" />
              <h1 className="flex flex-col -space-y-7">
                <span className="text-sm text-[rgb(0,0,0,0.6)]  font-semibold">
                  Aantal Leningen
                </span>
                <br />
                <span className="text-2xl text-black font-bold">4000</span>
              </h1>
            </li>
            <li className="flex w-1/4 h-full items-center gap-4 justify-center">
              <FaBoxes className="size-10 text-yellow-300" />
              <h1 className="flex flex-col -space-y-7">
                <span className="text-sm text-[rgb(0,0,0,0.6)]  font-semibold">
                  Aantal Gebruikers
                </span>
                <br />
                <span className="text-2xl text-black font-bold">6</span>
              </h1>
            </li>
          </ul>
        </div>
        <div className="flex w-full justify-center gap-10  mt-10 flex-wrap ">
          <div className="flex flex-col items-stretch gap-1 flex-wrap ">
            <h1 className="text-xl text-center font-semibold">
              Inventaris Overzicht
            </h1>
            <div className="flex gap-8 h-44 mt-6 border ">
              <figure onClick={()=> inventarisBeschikbaar()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4">
                <BiCheckCircle className="size-16 ml-4 text-green-700" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Beschikbaar
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                    {inventarisAantallen.beschikbaar}
                  </span>
                </h1>
              </figure>
              <figure onClick={()=> inventarisGereserveerd()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-blue-200 flex-col justify-center gap-4">
                <BiCircle className="size-16 ml-4 text-blue-600" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Gereserveerd
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                  {inventarisAantallen.gereserveerd}
                  </span>
                </h1>
              </figure>
              <figure onClick={()=> inventarisGepauzeerd()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4">
                <BiPauseCircle className="size-16 ml-4 text-amber-600" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Gepauzeerd
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                  {inventarisAantallen.gepauzeerd}
                  </span>
                </h1>
              </figure>
            </div>
            <footer className="flex justify-end">
              <Link to={`/admin/inventaris`} className="flex items-center">
                <p>Ga naar Inventaris</p>
                <MdKeyboardArrowRight className="size-5" />
              </Link>
            </footer>
          </div>
          <div className="flex flex-col gap-1 max-w-1/2 flex-wrap ">
            <h1 className="text-xl text-center font-semibold">
              Leningen Overzicht
            </h1>
            <div className="flex gap-8 h-44 mt-6 border ">
              <figure
                onClick={() => leningInOrde()}
                className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4"
              >
                <BiCheck className="size-16 ml-4 text-green-700" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    In orde
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                    {leningAantallen.inOrde}
                  </span>
                </h1>
              </figure>
              <figure onClick={()=> leningBezig()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4">
                <BiRun className="size-16 ml-4 text-amber-600" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Lopend
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                    {leningAantallen.bezig}
                  </span>
                </h1>
              </figure>
              <figure onClick={()=> leningTeLaat()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-red-100 flex-col justify-center gap-4">
                <BiTimeFive className="size-16 ml-4 text-red-600" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Te laat
                  </span>
                  <br />
                  <span className="text-2xl text-black font-semibold">
                    {leningAantallen.teLaat}
                  </span>
                </h1>
              </figure>
              <figure onClick={()=> leningVoorboeking()} className="flex h-full w-[120px] cursor-pointer border rounded-lg items-start border-gray-300 bg-blue-100 flex-col justify-center gap-4">
                <BiBook className="size-16 ml-4 text-blue-700" />
                <h1 className="flex flex-col -space-y-7 ml-4">
                  <span className="text-base text-Grijs font-nm text-">
                    Voorboeking
                  </span>
                  <br />
                  <span className="text-2xl text-black font-bold">
                    {leningAantallen.voorboeking}
                  </span>
                </h1>
              </figure>
            </div>
            <footer className="flex justify-end">
              <Link to={`/admin/inventaris`} className="flex items-center">
                <p>Ga naar Leningen</p>
                <MdKeyboardArrowRight className="size-5" />
              </Link>
            </footer>
          </div>
        </div>
        <div className="m-8">
          <div className="flex items-center gap-5">
            <h1 className="text-xl font-semibold">
              Reservaties op te halen vandaag
              <sup
                className={
                  reservatiesRetourneren.length
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {reservatiesRetourneren.length}
              </sup>
            </h1>
            <span
              onClick={() => seyEyeToggleRetour(!eyeToggleRetour)}
              className="cursor-pointer"
            >
              {eyeToggleRetour ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex w-auto  h-auto">
            <div>{loading && <Spinner />}</div>
            {eyeToggleRetour ? (
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
                      Uitgeleend door
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Afhaaldatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Retourdatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Valideren
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservatiesRetourneren.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen reservaties die vandaag worden afgehaald
                      </td>
                    </tr>
                  ) : (
                    reservatiesRetourneren.map((reservatie) => (
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
                        <td className="px-2">
                          {`${reservatie.gebruiker.email
                            .split("@")[0]
                            .replace(".", " ")}`}
                        </td>
                        <td className="px-2">{reservatie.afhaalDatum}</td>
                        <td className="px-2">{reservatie.retourDatum}</td>
                        <td className="px-2 flex justify-center">
                          <div>
                            <FaCheck
                              onClick={() =>
                                handleTerugbreng(reservatie.reservatieNr)
                              }
                              className="w-8 h-8 p-1 rounded-full bg-green-500 text-white cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className="my-4" />

        <div className="m-8">
          <div className="flex items-center gap-5">
            <h1 className="text-xl font-semibold">
              Reservaties af te halen vandaag
              <sup
                className={
                  reservatiesAfhalen.length ? "text-red-600" : "text-green-600"
                }
              >
                {reservatiesAfhalen.length}
              </sup>{" "}
            </h1>
            <span
              onClick={() => setEyeToggleAfhaal(!eyeToggleAfhaal)}
              className="cursor-pointer"
            >
              {eyeToggleAfhaal ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex w-auto  h-auto">
            <div>{loading && <Spinner />}</div>
            {eyeToggleAfhaal ? (
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
                      Uitgeleend door
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Afhaaldatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Retourdatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Valideren
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservatiesAfhalen.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen reservaties die vandaag worden afgehaald
                      </td>
                    </tr>
                  ) : (
                    reservatiesAfhalen.map((reservatie) => (
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
                        <td className="px-2">
                          {`${reservatie.gebruiker.email
                            .split("@")[0]
                            .replace(".", " ")}`}
                        </td>
                        <td className="px-2">{reservatie.afhaalDatum}</td>
                        <td className="px-2">{reservatie.retourDatum}</td>
                        <td className="px-2 flex justify-center">
                          <div>
                            <FaCheck
                              onClick={() =>
                                handleUitleen(reservatie.reservatieNr)
                              }
                              className="w-8 h-8 p-1 rounded-full bg-green-500 text-white cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
          <hr className="my-4" />
        </div>

        <div className="m-8">
          <div className="flex items-center gap-5">
            <h1 className="text-xl font-semibold">
              Te laat of onvolledig
              <sup
                className={
                  reservatiesTeLaatOnvolledig.length
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {reservatiesTeLaatOnvolledig.length}
              </sup>
            </h1>
            <span
              onClick={() =>
                setEyeToggleTeLaatOnvolledig(!eyeToggleTeLaatOnvolledig)
              }
              className="cursor-pointer"
            >
              {eyeToggleTeLaatOnvolledig ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="flex w-auto  h-auto">
            <div>{loading && <Spinner />}</div>
            {eyeToggleTeLaatOnvolledig ? (
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
                      Uitgeleend door
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Afhaaldatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Retourdatum
                    </th>
                    <th scope="col" className="px-1 font-semibold text-center">
                      Valideren
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservatiesTeLaatOnvolledig.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen reservaties die te laat of onvolledig zijn
                      </td>
                    </tr>
                  ) : (
                    reservatiesTeLaatOnvolledig.map((reservatie) => (
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
                        <td className="px-2">
                          {`${reservatie.gebruiker.email
                            .split("@")[0]
                            .replace(".", " ")}`}
                        </td>
                        <td className="px-2">{reservatie.afhaalDatum}</td>
                        <td className="px-2">{reservatie.retourDatum}</td>
                        <td className="px-2 flex justify-center">
                          <div>
                            <FaCheck
                              onClick={() =>
                                handleTerugbreng(reservatie.reservatieNr)
                              }
                              className="w-8 h-8 p-1 rounded-full bg-green-500 text-white cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>

        <hr className="my-4" />
        {showModal && (
          <ProductDetailsReservatie
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
