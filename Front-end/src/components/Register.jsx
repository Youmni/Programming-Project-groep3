import React, { useState, useEffect } from "react";
import { IoInformationCircleSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";

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
}else {
    setError("Email moet een @student.ehb.be of @ehb.be bevatten");
}
}

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
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user", error);
      setError(error);
    }

    error !== '' ? navigate("/login") : alert(error);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex w-full h-screen bg-slate-100 justify-center items-center">
      <form action="" className="flex w-3/5 h-3/4 shadow-lg rounded-md">
      <div className="flex w-1/2 bg-gradient-to-r from-red-300 to-red-500">
          <header className="flex w-full h-full">
            <h1 className="flex flex-col w-full h-full items-center mt-48 gap-10">
              <span className="text-4xl text-white font-extralight">
                Welkom,
              </span>
              <span className="text-4xl text-center text-white font-semibold">
                Bij het medialab{" "}
                <span className="font-bold text-6xl">uitleendienst</span>
              </span>
            </h1>
          </header>
        </div>
        <div className="flex w-1/2 h-full bg-white pl-10 pt-10 pr-10 flex-col items-center">
          <header className="flex w-full h-20 items-center justify-between">
            <h1 className="text-4xl font-light">Registratie</h1>
            <Link
              to={`https://www.erasmushogeschool.be/nl/onderzoek/labs/medialab.brussels/medialab`}
              target="blank"
            >
              <IoInformationCircleSharp className="size-7" />
            </Link>
          </header>
          <div className="flex flex-col w-full gap-2 mt-10">
            <label htmlFor="" className="font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
              className="h-[50px] pl-4 rounded-2xl bg-gray-100"
            />
            <label htmlFor="" className="font-bold mt-10">
              Wachtwoord
            </label>
            <div className="relative  rounded-2xl bg-gray-100 w-full h-[50px]">
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
              Registreer
            </button>
            <Link to="/login" className="text-red-500 text-center">
              Heb je al een account? Login{" "}
              <span className="underline">hier</span>
            </Link>
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
