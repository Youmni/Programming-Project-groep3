import React from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";


const login = () => {
  return (
    <div className="flex w-full h-screen bg-slate-100 justify-center items-center">
      <form action="" className="flex w-3/5 h-3/4 shadow-lg rounded-md ">
        <div className="flex w-1/2 h-full bg-white pl-10 pt-10 pr-10 flex-col items-center">
          <header className="flex w-full h-20  items-center justify-between">
           <h1 className="text-4xl font-light">Log in</h1>
           <Link to={`https://www.erasmushogeschool.be/nl/onderzoek/labs/medialab.brussels/medialab`} target="blank">
           <IoInformationCircleSharp className="size-7"/>
           </Link>
          </header>
          <div className="flex flex-col w-full gap-2 mt-10">
            <label htmlFor="" className="font-bold">Gebruikersnaam</label>
            <input type="text" name="" id="" placeholder="Gebruikersnaam" className="h-[50px] pl-4 rounded-2xl bg-gray-100"/>
            <label htmlFor="" className="font-bold mt-10">Wachtwoord</label>
            <input type="password" name="" id="" placeholder="Wachtwoord" className="h-[50px] pl-4 rounded-2xl bg-gray-100"/>
          </div>
          <div className="flex flex-col w-full gap-5 mt-20">
            <button onClick={() => <Link to={`/http://localhost:5173/home`}></Link> } className="w-full h-12 bg-red-400 rounded-3xl text-white hover:bg-red-700">Log in</button>
            <Link to="/register" className="text-red-500 text-center">Nog geen account? Registreer <span className="underline">hier</span></Link>
          </div>
        </div>
        <div className="flex w-1/2 bg-gradient-to-r from-red-300 to-red-500">
          <header className="flex  w-full h-full">
            <h1 className="flex flex-col w-full h-full items-center mt-48 gap-10">
              <span className="text-4xl text-white font-extralight">
                Welkom,
              </span>
              <span className="text-4xl text-center text-white font-semibold">
                Bij het medialab <span className="font-bold text-6xl">uitleendienst</span>
              </span>
            </h1>
          </header>
        </div>
      </form>
    </div>
  );
};

export default login;
