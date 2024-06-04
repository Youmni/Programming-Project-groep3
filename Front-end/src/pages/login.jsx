import React, { useState } from "react";
import { IoInformationCircleSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
        enqueueSnackbar("Succesvol ingelogd", { variant: "success" });
      } else {
        enqueueSnackbar("Fout bij inloggen", { variant: "error" });
      }

      setLoading(false);
    } catch (err) {
      enqueueSnackbar("Fout bij inloggen: " + err, { variant: "error" });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex w-full h-screen bg-slate-100 justify-center items-center">
      <form action="" className="flex flex-col md:flex-row w-full h-full md:w-3/5 md:h-3/4 shadow-lg rounded-md">
        <div className="md:flex-1 bg-gradient-to-r from-red-300 to-red-500">
          <header className="flex flex-col justify-center h-full p-10 text-center md:text-left">
            <h1 className="text-4xl text-white font-extralight">Welkom,</h1>
            <h2 className="text-4xl text-white font-semibold">Bij het medialab uitleendienst</h2>
          </header>
        </div>
        <div className="md:flex-1 bg-white p-10 flex flex-col justify-center">
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-light">Log in</h1>
            <Link to={`https://www.erasmushogeschool.be/nl/onderzoek/labs/medialab.brussels/medialab`} target="_blank">
              <IoInformationCircleSharp className="size-7" />
            </Link>
          </header>
          <div className="flex flex-col gap-5">
            <label htmlFor="email" className="font-bold">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="h-12 pl-4 rounded-2xl bg-gray-100"
            />
            <label htmlFor="wachtwoord" className="font-bold">Wachtwoord</label>
            <div className="relative rounded-2xl bg-gray-100 h-12">
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
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-10 md:mt-20 gap-5">
            <button onClick={handleClick} className="h-12 bg-red-400 rounded-3xl text-white hover:bg-red-700">Login</button>
            <Link to="/register" className="text-red-500 text-center">Nog geen account? Registreer <span className="underline">hier</span></Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
