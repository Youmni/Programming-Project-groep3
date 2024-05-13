import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ehbLogo from "../assets/ehb-logo.jpg";
import { IoIosMenu } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  // For clicking inside and outside of the box --->>
  const [clicked, setClicked] = useState(false);
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

  // Define categories
  const categories = ['Audio', 'Video', 'XR', 'Tools', 'Belichting', 'Varia'];

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
        <div className="relative" ref={node}>
          <button onClick={handleButtonClick}>
            <IoIosMenu className="flex h-full size-12 text-Grijs p-1 ml-1 transform transition-transform duration-250 hover:scale-110" />
            {clicked && (
              <div className="origin-top-right absolute left-0 mt-4 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-center">
                <h3 className="text-lg">Categoriën</h3>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index} className="hover:bg-blue-500 hover:text-white">{category}</li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        </div>

        <div className="flex w-full h-full items-center justify-between">
          <div className="flex flex-grow h-12  border items-center rounded-lg gap-1 mr-5">
            <IoSearchOutline className="size-7 text-Grijs ml-2 transform transition-transform duration-250 hover:scale-110" />
            <input
              type="search"
              name="search-bar"
              id=""
              placeholder="Zoek hier..."
              className="h-full w-full  rounded-lg border-Lichtgrijs p-2"
            />
          </div>
          <div className="flex h-full w-auto sm:ml-5 md:ml-10 lg:ml-20 items-center justify-start sm:gap-5 md:gap-10 lg:gap-20">
            <Link to={"/leningen"}>
              <FaUser className="flex h-full size-14  text-Grijs p-2 
                transform transition-transform duration-250 hover:scale-110" />
            </Link>
            
            <FaShoppingCart className="flex h-full size-14 text-Grijs sm:mr-5 md:mr-10 lg:mr-20 p-2 
            transform transition-transform duration-250 hover:scale-110" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;


