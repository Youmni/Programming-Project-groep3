import react, { useEffect, useReducer, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FaCirclePause } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import { IoMdArrowDropdown } from "react-icons/io";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [reservatiesRetour, setReservaties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
        variant: "error",
      });
      navigate("/login");
      return;
    }
  }, []);

  const datumVandaag = () => {
    const vandaag = new Date();
    const dd = String(vandaag.getDate()).padStart(2, "0");
    const mm = String(vandaag.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = vandaag.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reservatie/retourDatum=${datumVandaag()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReservaties(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        enqueueSnackbar("Er zijn geen reservaties gevonden", {
          variant: "error",
        });
      });
  }, []);

  return (
    <main className=" p-10 w-">
      <h1 className=" flex text-4xl font-bold w-40 border-b justify-center">
        Dashboard
      </h1>

      <div className="flex items-center gap-2 mt-10 ml-5  justify-between">
        <breadcrumb className="flex items-center gap-2">
          <RxDashboard className="text-rood size-5" />
          <breadcrumb-item>Dashboard</breadcrumb-item>
        </breadcrumb>
      </div>
      <div className="flex  mt-8 justify-center border  ml-8">
        <ul className="flex justify-center h-auto ">
          <li className="flex w-80 h-full items-center border-r gap-4 justify-center">
            <FaBoxes className="size-10 text-yellow-300" />
            <h1 className="flex flex-col -space-y-7">
              <span className="text-sm text-[rgb(0,0,0,0.6)] font-semibold ">
                Aantal producten
              </span>
              <br />
              <span className="text-2xl text-black font-bold">4000</span>
            </h1>
          </li>
          <li className="flex w-80 h-full items-center border-r gap-4 justify-center">
            <FaBoxes className="size-10 text-yellow-300" />
            <h1 className="flex flex-col -space-y-7">
              <span className="text-sm text-[rgb(0,0,0,0.6)]  font-semibold ">
                Aantal Categorieen
              </span>
              <br />
              <span className="text-2xl text-black font-bold">4000</span>
            </h1>
          </li>
          <li className="flex w-80 h-full items-center border-r gap-4 justify-center">
            <FaBoxes className="size-10 text-yellow-300" />
            <h1 className="flex flex-col -space-y-7">
              <span className="text-sm text-[rgb(0,0,0,0.6)]  font-semibold">
                Aantal Leningen
              </span>
              <br />
              <span className="text-2xl text-black font-bold">4000</span>
            </h1>
          </li>
          <li className="flex w-80 h-full items-center gap-4 justify-center">
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

      <div className="flex w-full  gap-20 mt-10 ml-8">
        <div className="flex w-1/2  flex-col gap-1">
          <h1 className="flex text-xl font-semibold">Inventaris Overzicht</h1>
          <div className="flex  gap-8 h-44 mt-6  justify-end">
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4">
              <FaCheckCircle className="size-16 ml-4 text-green-700" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Beschikbaar
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-red-200 flex-col justify-center gap-4">
              <RiReservedFill className="size-16 ml-4 text-red-600" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Gereserveerd
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4">
              <PiHandCoinsDuotone className="size-16 ml-4 text-amber-600" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Uitgeleend
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-blue-100 flex-col justify-center gap-4">
              <FaCirclePause className="size-16 ml-4 text-blue-700" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Gepauzeerd
                </span>
                <br />
                <span className="text-2xl text-black font-bold">6</span>
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
        <div className="flex w-1/2  flex-col justify-end gap-1">
          <h1 className="flex text-xl font-semibold">Leningen Overzicht</h1>
          <div className="flex  gap-8 h-44 mt-6 ">
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-green-100 flex-col justify-center gap-4">
              <FaCheckCircle className="size-16 ml-4 text-green-700" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  In orde
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-red-200 flex-col justify-center gap-4">
              <RiReservedFill className="size-16 ml-4 text-red-600" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Lopend
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-amber-100 flex-col justify-center gap-4">
              <PiHandCoinsDuotone className="size-16 ml-4 text-amber-600" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Te laat
                </span>
                <br />
                <span className="text-2xl text-black font-semibold">6</span>
              </h1>
            </figure>
            <figure className="flex h-full w-[120px] border rounded-lg items-start border-gray-300 bg-blue-100 flex-col justify-center gap-4">
              <FaCirclePause className="size-16 ml-4 text-blue-700" />
              <h1 className="flex flex-col -space-y-7 ml-4">
                <span className="text-base text-Grijs font-nm text-">
                  Voorboeking
                </span>
                <br />
                <span className="text-2xl text-black font-bold">6</span>
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
        <h1 className="text-xl font-semibold">Reservaties tegen vandaag</h1>
        <div className="flex w-auto  h-auto">
          <div>{loading && <Spinner />}</div>
          <table className="w-full">
  <thead>
    <tr className="text-gray-300">
      <th scope="col" className="px-1 font-semibold text-center">
        Reservatie ID
      </th>
      <th scope="col" className="px-1 font-semibold text-center py-4">
        Producten
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
      <th scope="col" className="px-1 font-semibold text-center py-4">
        Actie
      </th>
    </tr>
  </thead>
  <tbody>
    {reservatiesRetour.map((reservatie) => (
      <tr key={reservatie.reservatieNr} className="text-center">
        <td className="px-2">{reservatie.reservatieNr}</td>
        <td className="px-2">{reservatie.producten.length}</td>
        <td className="px-2">{`${reservatie.gebruiker.email.split("@")[0].replace(".", " ")}`}</td>
        <td className="px-2">{reservatie.afhaalDatum}</td>
        <td className="px-2">{reservatie.retourDatum}</td>
        <td className="px-2 flex justify-center">{/* hier moet je de reservatie in detail kunnen bekijken */}</td>
        <td className="px-2 flex justify-center">
          <FaCheck className="w-8 h-8 p-1 rounded-full bg-green-500 text-white cursor-pointer" />
        </td>
        <td className="px-2"></td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
        <hr className="my-4" />

        <h1 className="text-xl font-semibold">Reservaties die te laat zijn</h1>
        <div>{loading && <Spinner />}</div>
        <table className="w-full h-full">
          <thead className="w-full items-center h-16">
            <tr className="flex justify-evenly items-center mt-5  text-gray-300">
              <th scope="col" className="px-2 font-semibold">
                Product
              </th>
              <th scope="col" className="font-semibold">
                Uitgeleend door
              </th>
              <th scope="col" className="font-semibold">
                Afhaaldatum
              </th>
              <th scope="col" className=" font-semibold">
                Retourdatum
              </th>
              <th scope="col" className="font-semibold">
                Valideren
              </th>
              <th scope="col" className="font-semibold">
                Actie
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <hr className="my-4" />
    </main>
  );
};

export default Dashboard;
