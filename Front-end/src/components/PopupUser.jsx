import React, { useEffect, useState } from "react";
import canonFoto from "../assets/canon-eos-200d.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {FaRegUserCircle} from "react-icons/fa";

const PopupUser = ({ onClose, gebruiker }) => {
  const [reservaties, setReservaties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const formatNameFromEmail = (email) => {
    const localPart = email.split("@")[0];
    const nameParts = localPart.split(".");
    const formattedName = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return formattedName;
  };

  const naam = formatNameFromEmail(gebruiker.email);
  console.log(naam);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredReservaties = reservaties.filter((reservatie) =>
    String(reservatie.reservatieNr)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
      .get(
        `http://localhost:8080/reservatie/gebruikerId=${gebruiker.gebruikerID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setReservaties(response.data);
        enqueueSnackbar("Reservaties opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar(
          "Er is iets fout gegaan bij het ophalen van de reservaties",
          { variant: "error" }
        );
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "In orde":
        return "text-green-500";
      case "Bezig":
        return "text-orange-400";
      case "Voorboeking":
        return "text-sky-700";
      case "Te laat":
        return "text-rose-950";
      default:
        return "text-black";
    }
  };


  const statusCounts = reservaties.reduce((acc, reservatie) => {
    acc[reservatie.status] = (acc[reservatie.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-2xl h-[100%] w-[60%] relative shadow-md">
        <section className="flex gap-3 items-start">
          <div className="flex flex-col items-center text-black justify-center gap-2">
            <FaRegUserCircle className="size-24" />
            <div className="bg-gray-300 py-1 px-6 rounded-lg text-black text-lg">
                <h2>{gebruiker.titel}</h2>
            </div>
          </div>
            <div className="text-lg flex  flex-col items-start mt-3">
              <h2 className="font-bold text-2xl">{naam} </h2>
              <h3>{gebruiker.email}</h3>
              <h3>Id: #{gebruiker.gebruikerID}</h3>
            </div>
        </section>
        <section className="flex justify-start flex-wrap gap-5 mt-4">
          {statusCounts["In orde"] && (
            <div className="bg-green-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Beschikbaar ({statusCounts["In orde"]})
            </div>
          )}
          {statusCounts["Bezig"] && (
            <div className="bg-orange-400 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Bezig ({statusCounts["Bezig"]})
            </div>
          )}
          {statusCounts["Voorboeking"] && (
            <div className="bg-sky-700 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Voorboeking ({statusCounts["Voorboeking"]})
            </div>
          )}
          {statusCounts["Te laat"] && (
            <div className="bg-rose-950 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Te laat ({statusCounts["Te laat"]})
            </div>
          )}
        </section>
        <h2 className="font-bold mt-4 text-gray-700 text-xl">Overzicht</h2>
        <section className="mt-2 border-2 flex flex-col max-h-[380px] overflow-y-auto border-gray rounded-lg p-3">
          <section className="flex justify-start gap-6 sticky top-0 z-50 bg-white">
            <div className="flex items-center bg-white border border-gray-700 rounded-lg p-3 gap-2 w-[40%]">
              <CiSearch className="text-gray-500 font-bold" size={18} />{" "}
              <input
                className="outline-none text-lg"
                type="text"
                placeholder="Lening-ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center border border-gray-700 rounded-lg">
              <select className="p-2 rounded-lg  text-black outline-none text-lg">
                <option value="">status</option>
                <option value="In orde">In orde</option>
                <option value="Bezig">Bezig</option>
                <option value="Voorboeking">Voorboeking</option>
                <option value="Uitgeleend">Uitgeleend</option>
              </select>
            </div>
          </section>
          <table className="w-full h-full">
            <thead className="w-full items-center h-16">
              <tr className="text-sm text-Lichtgrijs font-thin ">
                <th scope="col" className=" px-2 ">
                  Nr
                </th>
                <th
                  scope="col"
                  className="text-left hover:cursor-pointer w-80 "
                >
                  Lening Id
                </th>
                <th scope="col" className="text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReservaties.map((reservatie, index) => (
                <tr key={reservatie.reservatieNr} className="h-12 w-auto ">
                  <td className="text-center h-full">{index}</td>
                  <td className="">#{reservatie.reservatieNr}</td>
                  <td className={getStatusColor(reservatie.status)}>{reservatie.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="flex justify-between absolute bottom-6 left-0 px-10 w-full items-center">
          <button onClick={onClose} className="text-xl hover:underline">
            terug
          </button>
        </section>
      </div>
    </div>
  );
};

export default PopupUser;
