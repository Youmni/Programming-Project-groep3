import react, { useEffect, useReducer, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { Link, json } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { data } from "autoprefixer";
import canonFoto from "../../assets/canon-eos-200d.jpg";
import Spinner from "../../components/Spinner";
import { PiKeyReturnFill } from "react-icons/pi";


const Leningen = () => {
  const [reservaties, setReservaties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    // fetch Reservaties
    axios
      .get("http://localhost:8080/reservatie")
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
      String(reservatie.reservatieNr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <content className="top-0 flex-grow">
      <main className="flex-grow p-10">
        <div className="flex justify-between items-center w-auto h-auto">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-center">
            Leningen
          </h1>
        </div>
        <div className="flex items-center gap-2 mt-10 ml-5 w-auto  justify-between">
          <breadcrumb className="flex items-center gap-2">
            <RxDashboard className="text-rood" />
            <breadcrumb-item>Leningen</breadcrumb-item>
          </breadcrumb>
          <div className="items-center flex h-12 gap-4">
            <div className="items-center flex h-full border-2 w-56 gap-2 rounded-xl border-Lichtgrijs hover:border-black">
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
            <div className="flex h-full border-2 rounded-xl items-end justify-center border-Lichtgrijs w-28 hover:cursor-pointer">
              <div className="flex h-full items-center justify-center gap-2">
                <FaFilter className="size-4 text-black-600" />
                <h2 className="text-xl font-semibold">Filter</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-auto h-auto">
          <div>{loading && <Spinner />}</div>
          <table className="w-full h-full">
            <thead className="w-full items-center h-16">
              <tr className="text-sm text-Lichtgrijs font-thin">
                <th scope="col" className="text-left px-2 ">
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
                    Product
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left">
                  Aantal
                </th>
                <th scope="col" className="">
                  <div className="flex items-center">
                    Uitgeleend door
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left">
                  <div className="flex items-center">
                    Uitgeleend op
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left ">
                <div className="flex items-center">
                    Uitgeleend tot
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-left ">
                <div className="flex items-center">
                    status
                    <IoMdArrowDropdown className="size-4 text-Grijs" />
                  </div>
                </th>
                <th scope="col" className="text-right">
                  Actie
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReservaties.map((reservatie) => (
                <tr
                  key={reservatie.reservatieNr}
                  className="h-20 text-black font-semibold hover:bg-gray-200 "
                >
                  <td className="text-center h-full ">
                    {reservatie.reservatieNr}
                  </td>
                  <td className="">
                    <div className="flex items-center justify-start gap-2  ">
                      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-Lichtgrijs">
                        <img
                          src={canonFoto}
                          alt=""
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                      <h2 className="flex flex-col -space-y-1">
                        <span className="text-base text-black font-semibold">{`${reservatie.productreservatieNaam}`}</span>
                        <span className="text-sm text-Lichtgrijs">{`${reservatie.productreservatieMerk}`}</span>
                      </h2>
                    </div>
                  </td>
                  <td className="">
                    <h2 className="text-lg">{`${reservatie.aantal}`}</h2>
                  </td>
                  <td className="">{reservatie.gebruiker.email}</td>
                  <td className="">{reservatie.boekingDatum}</td>
                  <td className="">{reservatie.retourDatum}</td>
                  <td className="">{reservatie.status}</td>
                  <td className="">
                    <div className="flex justify-end items-center ">
                      <Link
                        to={`/admin/inventaris/wijzigen/${reservatie.productreservatieNr}`}
                        className="bg-gray-600 text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-black"
                      >
                        <PiKeyReturnFill className="size-6" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </content>
  );
};

export default Leningen;
