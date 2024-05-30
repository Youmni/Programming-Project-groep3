import react, { useEffect, useReducer, useState } from "react";
import { RiDatabase2Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { json } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { data } from "autoprefixer";
import canonFoto from "../../assets/canon-eos-200d.jpg";
import Spinner from "../../components/Spinner";
import { PiKeyReturnFill } from "react-icons/pi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import { IoInformationCircleSharp } from "react-icons/io5";
import ChooseProduct from "../../components/ChooseProduct";
import ProductDetailsReservatie from "../../components/ProductDetailsReservatie";


const Leningen = () => {
  const [reservaties, setReservaties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservatie, setSelectedReservatie] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();
  
  const url = location.state?.url || "http://localhost:8080/reservatie";

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      enqueueSnackbar('Uw sessie is verlopen. Log opnieuw in.', { variant: 'error' });
      navigate("/login");
      return;
    }

    
    setLoading(true);
    // fetch Reservaties
    axios
      .get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setReservaties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredReservaties = reservaties.filter(
    (reservatie) =>
      reservatie.gebruiker.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservatie.gebruiker.titel
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        reservatie.status
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(reservatie.reservatieNr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  const sortedReservaties = filteredReservaties.sort((a, b) => a.reservatieNr - b.reservatieNr);


  const openModal = (reservatie) => {
    setSelectedReservatie(reservatie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  const formatName = (email) => {
    const localPart = email.split("@")[0];
    const nameParts = localPart.split(".");
    const formattedName = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return formattedName;
  };


  const formatDateToDutch = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('nl-NL', options).format(date);
  };
  return (
    <div className="top-0 flex-grow">
      <main className="flex-grow p-10">
        <div className="flex justify-between items-center w-auto h-auto">
          <h1 className="flex text-3xl font-bold w-40 border-b justify-center">
            Leningen
          </h1>
        </div>
        <div className="flex items-center gap-2 mt-10 ml-5 w-auto justify-between">
          <div className="flex items-center gap-2">
            <RiDatabase2Line className="text-rood" />
            <span>Leningen</span>
          </div>
          <div className="flex items-center h-12 gap-4">
            <div className="flex items-center h-full border-2 w-56 gap-2 rounded-xl border-Lichtgrijs hover:border-black">
              <IoSearchOutline className="ml-2 size-6" />
              <input
                type="search"
                placeholder="Zoek hier"
                className="h-full w-full rounded-xl p-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex h-full border-2 rounded-xl items-center justify-center border-Lichtgrijs w-28 hover:cursor-pointer">
              <FaFilter className="size-4 text-black-600" />
              <h2 className="text-xl font-semibold">Filter</h2>
            </div>
          </div>
        </div>
        <table className="w-full mt-10">
          <thead>
            <tr className="text-gray-400">
              <th scope="col" className="px-1 font-semibold text-center">
                Reservatie ID
              </th>
              <th scope="col" className="px-1 font-semibold text-center py-4">
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
                Status
              </th>
              <th scope="col" className="px-1 font-semibold text-center">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {reservaties.length === 0 ? (
              <tr>
                <td colSpan="7" className="rounded p-4 text-black text-center">
                  Geen reservaties
                </td>
              </tr>
            ) : (
              sortedReservaties.map((reservatie) => (
                <tr key={reservatie.reservatieNr} className="text-center space-y-4">
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
                    {formatName(reservatie.gebruiker.email)}
                  </td>
                  <td className="px-2">{formatDateToDutch(reservatie.afhaalDatum)}</td>
                  <td className="px-2">{formatDateToDutch(reservatie.retourDatum)}</td>
                  <td className={getStatusColor(reservatie.status)}>{reservatie.status}</td>
                  <td className="">
                    <div className="flex justify-center items-center ">
                      <Link
                        to={`/admin/inventaris/wijzigen/${reservatie.productreservatieNr}`}
                        className="bg-gray-600 text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-black"
                      >
                        <PiKeyReturnFill className="size-6" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default Leningen;
