import React, { useState } from "react";
import { IoInformationCircleSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { enqueueSnackbar } from "notistack";


const Login = () => {

  const [loginData, setLoginData] = useState({ email: "", wachtwoord: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const getTitle = async (id, token) => {
    try {
      const response = await axios.get(`http://localhost:8080/gebruiker/titel/id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console
      if (response.data.titel === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Er is iets fout gegaan bij het ophalen van de gebruiker", error);
    }
  };
  

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response = await axios.post('http://localhost:8080/gebruiker/login', {
        email: loginData.email,
        wachtwoord: loginData.wachtwoord
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data);
        const decoded = jwtDecode(response.data);
        getTitle(decoded.sub, response.data);
        enqueueSnackbar("Succesvol ingelogd", { variant: "success"});
      }
      else{
        enqueueSnackbar("Fout bij inloggen", { variant: "error"});
      }

      setLoading(false);
    } catch (err) {
      enqueueSnackbar("Fout bij inloggen: "+err, { variant: "error"});
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <div className="relative  rounded-2xl bg-gray-100 w-full h-[50px]">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={loginData.wachtwoord}
                placeholder="Wachtwoord"
                id="wachtwoord"
                name="wachtwoord"
                required
                className="h-full w-full pl-5 bg-inherit rounded-2xl"
              />
              <div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>
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