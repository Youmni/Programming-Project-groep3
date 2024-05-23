import React, { useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", wachtwoord: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  navigate("/home");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const redirectToPage = (titel) => {
    if (titel === "Admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  const generateHash = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const hashedWachtwoord = await generateHash(loginData.wachtwoord);
      
      const response = await axios.post('http://localhost:8080/gebruiker/login', {
        email: loginData.email,
        wachtwoord: hashedWachtwoord,
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data);
        const decoded = jwtDecode(response.data);
        console.log(decoded.Titel);
        redirectToPage(decoded.Titel);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-slate-100 justify-center items-center">
      <form className="flex w-3/5 h-3/4 shadow-lg rounded-md">
        <div className="flex w-1/2 h-full bg-white pl-10 pt-10 pr-10 flex-col items-center">
          <header className="flex w-full h-20 items-center justify-between">
            <h1 className="text-4xl font-light">Log in</h1>
            <Link
              to={`https://www.erasmushogeschool.be/nl/onderzoek/labs/medialab.brussels/medialab`}
              target="_blank"
            >
              <IoInformationCircleSharp className="size-7" />
            </Link>
          </header>
          <div className="flex flex-col w-full gap-2 mt-10">
            <label className="font-bold">Email</label>
            <input
              type="text"
              value={loginData.email}
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="Email"
              className="h-[50px] pl-4 rounded-2xl bg-gray-100"
            />
            <label htmlFor="wachtwoord" className="font-bold mt-10">
              Wachtwoord
            </label>
            <input
              type="password"
              value={loginData.wachtwoord}
              onChange={handleChange}
              name="wachtwoord"
              id="wachtwoord"
              placeholder="Wachtwoord"
              className="h-[50px] pl-4 rounded-2xl bg-gray-100"
            />
          </div>
          <div className="flex flex-col w-full gap-5 mt-20">
            <button
              onClick={handleClick}
              className="w-full h-12 bg-red-400 rounded-3xl text-white hover:bg-red-700"
            >
              Log in
            </button>
            <Link to="/register" className="text-red-500 text-center">
              Nog geen account? Registreer <span className="underline">hier</span>
            </Link>
          </div>
        </div>
        <div className="flex w-1/2 bg-gradient-to-r from-red-300 to-red-500">
          <header className="flex w-full h-full">
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

export default Login;
