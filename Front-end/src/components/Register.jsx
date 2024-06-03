import React, { useState, useEffect } from "react";
import { IoInformationCircleSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [registerData, setRegisterData] = useState({
    email: "",
    wachtwoord: "",
    titel: "",
    isGeblacklist: "False",
  });
  const [showPassword, setShowPassword] = useState(false);

  const titleCheck = (email) => {
    if (email.includes("@student.ehb.be")) {
      setRegisterData((prevData) => ({
        ...prevData,
        titel: "Student",
      }));
    } else if (email.includes("@ehb.be")) {
      setRegisterData((prevData) => ({
        ...prevData,
        titel: "Docent"
      }));
    } else {
      setError("Email moet een @student.ehb.be of @ehb.be bevatten");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    titleCheck(registerData.email);
  }, [registerData.email]);

  const handleClick = async (e) => {
    e.preventDefault();
    const email = registerData.email;
    const wachtwoord = registerData.wachtwoord;

    if (wachtwoord.length < 8) {
      alert("Wachtwoord moet minstens 8 karakters bevatten");
      return;
    }

    if (!email.includes("@")) {
      alert("Email moet een @ bevatten");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(wachtwoord, salt);
      const updatedData = { ...registerData, wachtwoord: hashedPassword};

      console.log(updatedData);
      const response = await axios.post(
        "http://localhost:8080/gebruiker/toevoegen",
        updatedData
      );
      enqueueSnackbar("Succesvol geregistreerd", { variant: "success" });
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
      enqueueSnackbar("Fout bij registreren: Probeer opnieuw " + error, { variant: "error" });
      setError(error);
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
            <h1 className="text-4xl font-light">Registratie</h1>
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
              value={registerData.email}
              onChange={handleChange}
              required
              className="h-12 pl-4 rounded-2xl bg-gray-100"
            />
            <label htmlFor="wachtwoord" className="font-bold">Wachtwoord</label>
            <div className="relative rounded-2xl bg-gray-100 h-12">
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                value={registerData.wachtwoord}
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
            <button onClick={handleClick} className="h-12 bg-red-400 rounded-3xl text-white hover:bg-red-700">Registreer</button>
            <Link to="/login" className="text-red-500 text-center">Heb je al een account? Login <span className="underline">hier</span></Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
