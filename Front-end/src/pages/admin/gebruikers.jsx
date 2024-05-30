import react, { useEffect, useReducer, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { json } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { data } from "autoprefixer";
import canonFoto from "../../assets/canon-eos-200d.jpg";
import Spinner from "../../components/Spinner";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaCircleInfo } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {enqueueSnackbar} from "notistack";
import PopupUser from "../../components/PopupUser";

const Gebruikers = () => {
  const [gebruikers, setGebruikers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGebruiker, setSelectedGebruiker] = useState(null);
  console.log(gebruikers);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      enqueueSnackbar('Uw sessie is verlopen. Log opnieuw in.', { variant: 'error' });
      navigate("/login");
      return;
    }
    
    setLoading(true);
    axios
      .get("http://localhost:8080/gebruiker", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setGebruikers(response.data);
        console.log(data);
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

  const formatName = (email) => {
    const localPart = email.split("@")[0];
    const nameParts = localPart.split(".");
    const formattedName = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return formattedName;
  };



  const filteredGebruikers = gebruikers.filter(
    (gebruiker) =>
      gebruiker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(gebruiker.gebruikerID).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedGebruikers = filteredGebruikers.sort((a, b) => a.gebruikerID - b.gebruikerID);


  const openUserPopup = (gebruiker) => {
    setSelectedGebruiker(gebruiker);
    setShowPopup(true);
};

const closeUserPopup = () => {
    setShowPopup(false);
}

const titelColor = (titel) => {
  switch (titel) {
    case "Student": return "bg-slate-300" ;	
    
    case "Docent": return "bg-lime-200";
    	
    case "Admin": return "bg-red-200";	
    
    default: return "bg-slate-300";
  }
}

  return (
    <div className="top-0 flex-grow">
      <main className="p-10">
        <h1 className="text-3xl font-bold w-40 border-b justify-center">
          Gebruikers
        </h1>

        <div className="flex mt-10 justify-between">
          <breadcrumb className="flex items-center gap-2">
            <FaUsers className="text-rood" />
            <breadcrumb-item>Gebruikers</breadcrumb-item>
          </breadcrumb>
          <div className="items-center flex h-12 gap-4">
            <div className="items-center flex h-full border-2 w-56 gap-1 rounded-xl border-Lichtgrijs">
              <IoSearchOutline className="ml-2 size-6" />
              <input
                type="search"
                name=""
                id=""
                placeholder="Zoek hier"
                className="h-full w-full rounded-xl p-2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex h-full border-2 items-center justify-center gap-3 rounded-xl border-Lichtgrijs w-28 hover:cursor-pointer">
              <FaFilter className="size-4 text-black-600" />
              <h2 className="text-xl font-semibold">Filter</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center ml-8">
          <div className="h-4 w-4 bg-black rounded-full"></div>
          <h2>Geblacklist</h2>
        </div>
        <div className="flex w-auto h-auto">
          <div>{loading && <Spinner />}</div>
          <table className="w-full h-auto">
          <thead className="w-full items-center h-16">
              <tr className="text-sm text-Lichtgrijs font-thin">
                <th scope="col" className="text-left ">
                <div className="flex items-center justify-center">
                    Nr
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="text-left hover:cursor-pointer w-80 "
                >
                  <div className="flex items-center ">
                    Naam/email
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left">
                  Statuut
                </th>
                <th scope="col" className="">
                  <div className="flex items-center">
                    # Leningen
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left">
                  <div className="flex items-center">
                    Laatste Lening
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                
                <th scope="col" className="text-right">
                  Actie
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedGebruikers.map((gebruiker) => (
                <tr key={gebruiker.gebruikerID} className="h-16 w-auto relative">
                  <td className="text-center">
                    {gebruiker.gebruikerID}
                  </td>
                  <td className="">
                    <div className="flex items-center justify-start h-full gap-2 overflow-x-hidden">
                      <div className="rounded-full items-center text-Grijs">
                        <FaRegUserCircle className="size-12" />
                      </div>
                      <h2 className="flex flex-col -space-y-1">
                        <span className="text-base text-Grijs font-semibold">{formatName(gebruiker.email)}</span>
                        <span className="text-base text-Lichtgrijs font-light">{`${gebruiker.email}`}</span>
                      </h2>
                    </div>
                  </td>
                  <td className="ml-2">
                    <div className={`flex w-3/5 border h-10 items-center justify-center rounded-md ${titelColor(gebruiker.titel)}`}>
                      <p>{gebruiker.titel}</p>
                    </div>
                  </td>
                  <td className="">{gebruiker.beschikbaar}</td>
                  <td className="">{gebruiker.uitgeleend}</td>

                  <td className="">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        className="bg-Grijs text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-black"
                        title="Edit"
                        onClick={() => openUserPopup(gebruiker)}
                      >
                        <FaCircleInfo  className="size-6" />
                      </button>
                    </div>
                  </td>

                  {
                    gebruiker.isGeblacklist === "True" && (
                      <div className="absolute h-4 w-4 left-0 top-7 bg-black rounded-full"></div>
                    )
                  }
                
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {showPopup && <PopupUser onClose={closeUserPopup} gebruiker={selectedGebruiker} />}
    </div>
  );
};

export default Gebruikers;
