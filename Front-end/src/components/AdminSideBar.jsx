import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ehbLogo from "../assets/ehb-logo.jpg";
import { RxDashboard } from "react-icons/rx";
import { TbBoxSeam } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { RiDatabase2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";


const AdminSideBar = () => {
  const [nav, setNav] = useState(true);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNav = () => {
    if (!isMediumScreen) {
      setNav(!nav);
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? "bg-red-200 rounded-xl text-red-500" : "";
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMediumScreen) {
      setNav(false);
    }
  }, [isMediumScreen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };


  if (nav) {
    return (
      <aside className="flex gap-1 h-screen flex-col border-r sticky border-Lichtgrijs top-0 left-0 w-60 pr-3 z-10">
        <a href="/admin/Dashboard">
          <header className="flex w-full h-20 gap-x-5 items-center">
            <img
              src={ehbLogo}
              alt="ehb Logo"
              className="h-full flex ml-4 object-fill"
            />
            <div className="flex border h-12 border-red-500"></div>
            <h1 className="flex flex-col -space-y-8">
              <span className="text-2xl text-red-500">Medialab</span>
              <br />
              <span className="text-xs text-Lichtgrijs">Uitleendienst</span>
            </h1>
          </header>
        </a>
        <button
          onClick={toggleNav}
          className="flex bg-red-500 w-8 absolute h-8 rounded-full top-20 left-56 items-center justify-center"
          disabled={isMediumScreen}
        >
          <IoIosArrowForward className="text-white size-5 rotate-180" />
        </button>
        <ul className="flex flex-col w-full gap-5">
          <h2 className="text-l p-3 text-Lichtgrijs ml-2">Menu</h2>
          <Link to={`/admin/Dashboard`} className={`text-Grijs ${isActiveLink("/admin/Dashboard")}`}>
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <RxDashboard className="size-7 bg-inherit ml-4" />
              Dashboard
            </li>
          </Link>
          <Link to={`/admin/Inventaris`} className={`text-Grijs ${isActiveLink("/admin/Inventaris")}`}>
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <TbBoxSeam className="size-7 bg-inherit ml-4" />
              Inventaris
            </li>
          </Link>
          <Link to={`/admin/Gebruikers`} className={`text-Grijs ${isActiveLink("/admin/Gebruikers")}`}>
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <FaUsers className="size-7 bg-inherit ml-4" />
              Gebruikers
            </li>
          </Link>
          <Link to={`/admin/Leningen`} className={`text-Grijs ${isActiveLink("/admin/Leningen")}`}>
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <RiDatabase2Line className="size-7 bg-inherit ml-4" />
              Leningen
            </li>
          </Link>
        </ul>
        <div className="w-full h-full flex items-end p-3 text-2xl gap-5 font-medium ">
          <div onClick={()=>handleLogout()} className=" flex items-center gap-5 cursor-pointer rounded-xl hover:text-rood">
          <IoLogOut className="size-7 bg-inherit ml-4" />
          Log out
          </div>
        </div>
      </aside>
    );
  } else {
    return (
      <aside
        className={`flex gap-1 flex-col sticky h-screen max-w-20 border-r w-24 border-Lichtgrijs top-0 left-0`}
      >
        <a href="/admin/Dashboard">
          <header className="flex w-full h-20 gap-x-5 items-center">
            <img
              src={ehbLogo}
              alt="ehb Logo"
              className="w-full h-auto flex object-cover"
            />
          </header>
        </a>
        {!isMediumScreen && (
          <button
            onClick={toggleNav}
            className="flex bg-red-500 w-8 absolute h-8 rounded-full top-20 left-16 items-center justify-center"
          >
            <IoIosArrowForward className="text-white size-5" />
          </button>
        )}
        <ul className="flex flex-col w-full gap-5">
          <h2 className="text-l p-3 text-Lichtgrijs ml-2">Menu</h2>
          <Link to={`/admin/Dashboard`} className="text-Grijs">
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <RxDashboard className="size-7 bg-inherit ml-4" />
            </li>
          </Link>
          <Link to={`/admin/Inventaris`} className="text-Grijs">
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <TbBoxSeam className="size-7 bg-inherit ml-4" />
            </li>
          </Link>
          <Link to={`/admin/Gebruikers`} className="text-Grijs">
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <FaUsers className="size-7 bg-inherit ml-4" />
            </li>
          </Link>
          <Link to={`/admin/Leningen`} className="text-Grijs">
            <li className="w-full flex items-center p-3 text-2xl gap-5 font-medium cursor-pointer rounded-xl hover:bg-red-200 hover:text-rood">
              <RiDatabase2Line className="size-7 bg-inherit ml-4" />
            </li>
          </Link>
        </ul>
        <div className="w-full h-full flex items-end p-3 text-2xl gap-5 font-medium ">
          <div onClick={()=>handleLogout()} className=" flex items-center gap-5 cursor-pointer rounded-xl hover:text-rood">
          <IoLogOut className="size-7 bg-inherit ml-4" />
          </div>
        </div>
      </aside>
    );
  }
};

export default AdminSideBar;
