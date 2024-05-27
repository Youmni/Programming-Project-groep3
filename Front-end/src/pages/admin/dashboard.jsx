import react, { useEffect, useReducer, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { FaBoxes } from "react-icons/fa";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FaCirclePause } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {enqueueSnackbar} from "notistack";


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      enqueueSnackbar('Uw sessie is verlopen. Log opnieuw in.', { variant: 'error' });
      navigate("/login");
      return;
    }
  },[])

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
      <div className="grid grid-cols-5 mt-4">
        <div>
          <p className="ml-4 font-semibold">Product</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend door</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend van</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend tot</p>
        </div>
        <div>
          <p className="font-semibold">Teruggave valideren</p>
        </div>
      </div>
      <hr className="my-4" />

      <h1 className="text-xl font-semibold">Reservaties die te laat zijn</h1>
      <div className="grid grid-cols-5 mt-4">
        <div>
          <p className="ml-4 font-semibold">Product</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend door</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend van</p>
        </div>
        <div>
          <p className="font-semibold">Uitgeleend tot</p>
        </div>
        <div>
          <p className="font-semibold">Teruggave valideren</p>
        </div>
      </div>
      <hr className="my-4" />
    </div>
    </main>
  );
};

export default Dashboard;
