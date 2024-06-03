import react, { useEffect, useReducer, useState } from "react";
import { RiDatabase2Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { json } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import OpmerkingenToevoegen from "../../components/OpmerkingenToevoegen";
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
import { useAuth } from "../../components/AuthToken";
import { FaCheck, FaComment } from "react-icons/fa";


const Leningen = () => {
  const [reservaties, setReservaties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpmerkingen, setShowOpmerkingen] = useState(false);
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [selectedReservatie, setSelectedReservatie] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();
  useAuth();


  const url = location.state?.url || "http://localhost:8080/reservatie";

  useEffect(() => {
    
    setLoading(true);
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

  const closeOpmerkingen = () => {
    setShowOpmerkingen(false);
  };
  const handleTerugbreng = (id, producten) => {
    useAuth();

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
        for (let product of producten) {
          handleProductStatus(product.productID, "Beschikbaar");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };

  const handleUitleen = (id, producten) => {
    useAuth();

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
        for (let product of producten) {
          handleProductStatus(product.productID, "Gereserveerd");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };

  const handleProductStatus = (id, status) => {
    useAuth();
    axios
      .put(
        `http://localhost:8080/product/${id}/bewerk-status?newStatus=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Product status is succesvol aangepast", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error" + error, { variant: "error" });
      });
  };



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

  const handleOpmerking = (reservatie) => {
    setSelectedReservatie(reservatie);
    setShowOpmerkingen(true);
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
            <div className="flex items-center h-full border-2 w-80 gap-2 rounded-xl border-Lichtgrijs hover:border-black">
              <IoSearchOutline className="ml-2 size-6" />
              <input
                type="search"
                placeholder="Zoek op naam, email, status of reservatieNr"
                className="h-full w-full rounded-xl p-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="m-8">
          <div className="flex w-auto  h-auto">
            <div>{loading && <Spinner />}</div>
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
                    Onvolledig
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
                  </tr>
                </thead>
                <tbody>
                  {reservaties.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="bg-green-600 rounded p-4 text-white text-center"
                      >
                        Geen reservaties die vandaag worden afgehaald
                      </td>
                    </tr>
                  ) : (
                    reservaties.map((reservatie) => (
                      <tr
                        key={reservatie.reservatieNr}
                        className="text-center space-y-4 border-2"
                      >
                        <td className="px-2">{reservatie.reservatieNr}</td>
                        <td className="px-2 flex justify-center">
                          <div>
                            <IoInformationCircleSharp
                              onClick={() => openModal(reservatie)}
                              className="w-8 h-8 p-1 mb-4 mt-auto rounded-full bg-black text-white cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="px-2">
                          {`${reservatie.gebruiker.email
                            .split("@")[0]
                            .replace(".", " ")}`}
                        </td>
                        <td className="px-2 flex justify-center">
                          <div>
                            <FaComment
                              onClick={() => handleOpmerking(reservatie)}
                              className="w-8 h-8 p-1 mb-4 mt-auto text-neutral cursor-pointer"
                            />
                          </div>
                        </td>
                        <td className="px-2">{reservatie.afhaalDatum}</td>
                        <td className="px-2">{reservatie.retourDatum}</td>
                        <td className={`px-2 font-medium  ${getStatusColor(reservatie.status)}`}>
                            {reservatie.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
        </div>
        <hr className="my-4" />
        {showModal && (
          <ProductDetailsReservatie
            reservatie={selectedReservatie}
            closeModal={closeModal}
          />
        )}
        {showOpmerkingen && (
          <OpmerkingenToevoegen
            reservatie={selectedReservatie}
            closeModal={closeOpmerkingen}
          />
        )}
      </main>
    </div>
  );
};

export default Leningen;
