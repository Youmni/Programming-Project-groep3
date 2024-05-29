import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ehbLogo from "../assets/ehb-logo.jpg";
import { IoIosMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import WinkelMandje from "../pages/user/winkelmandje";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { WinkelMandjeContext } from "../contexts/winkelmandjeContext";

const NavBar = () => {
  // For clicking inside and outside of the box --->>
  const [clicked, setClicked] = useState(false);
  const [winkelMandje, setWinkelMandje] = useState(false);
  const [categories, setCategories] = useState([]);
  const { winkelmandje } = useContext(WinkelMandjeContext);
  const node = useRef();
 

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setClicked(false);
  };

  useEffect(() => {
    if (clicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clicked]);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  //<<--
  const openWinkelMandje = () => {
    setWinkelMandje(true);
  };

  const closeWinkelMandje = () => {
    setWinkelMandje(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8080/categorie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Define categories

  return (
    <>
      <nav className="border flex items-center h-auto gap-7 w-full shadow-lg">
        <a href="/home">
          <header className="flex w-full h-20 gap-x-3 items-center">
            <img
              src={ehbLogo}
              alt="ehb Logo"
              className="h-full ml-2 items-center object-cover flex"
            />
            <div className="lg:block hidden border h-12 border-red-500"></div>
            <h1 className="lg:block hidden flex-col -space-y-8 pr-8">
              <span className="text-2xl text-red-500">Medialab</span>
              <br />
              <span className="text-xs text-Lichtgrijs}">Uitleendienst</span>
            </h1>
          </header>
        </a>

        {/* Category button + pop up */}
        <div className="relative z-50" ref={node}>
          <div
            onClick={handleButtonClick}
            className="flex items-center justify-center hover:bg-zinc-200 cursor-pointer rounded-lg p-2"
          >
            <span className="text-Grijs font-semibold">Categoriëen</span>
            <IoIosArrowDown className="size-4 text-Grijs " />
          </div>
          {clicked && (
            <div className="origin-bottom absolute left-0 mt-4 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-center">
              <h3 className="text-lg">Categoriëen</h3>
              <div className="flex flex-col">
                {categories.map((categorie, index) => (
                  <Link
                    to={`/inventaris/${categorie.categorieNr}`}
                    key={index}
                    className="hover:bg-blue-500 p-2 hover:text-white"
                  >
                    {categorie.categorieNaam}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full h-full items-center justify-between">
          <div className="flex flex-grow h-12  border-2 items-center rounded-lg gap-1 mr-5">
            <IoSearchOutline className="size-7 text-Grijs ml-2 transform transition-transform duration-250 hover:scale-110" />
            <input
              type="search"
              name="search-bar"
              id=""
              placeholder="Zoek hier..."
              className="h-full w-full  rounded-lg border-Lichtgrijs p-2 "
            />
          </div>
          <div className="flex h-full w-auto sm:ml-5 md:ml-10 lg:ml-20 items-center justify-start sm:gap-5 md:gap-10 lg:gap-20">
            <Link to={"/leningen"}>
              <FaUser
                className="flex h-full size-14  text-Grijs p-2 
                transform transition-transform duration-250 hover:scale-110"
              />
            </Link>

            <button
              className="flex relative cursor-pointer transform transition-transform duration-250 hover:scale-110 mr-10"
              onClick={openWinkelMandje}
            >
              <BiShoppingBag className="text-5xl text-Grijs" />
              <div className="absolute w-5 h-5 rounded-full z-10 right-[-3px] bottom-[-3px] flex items-center justify-center text-[14px] bg-red-500 text-white">
                <span>{winkelmandje.length}</span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      {winkelMandje && <WinkelMandje closeWinkelMandje={closeWinkelMandje} />}
    </>
  );
};

export default NavBar;
