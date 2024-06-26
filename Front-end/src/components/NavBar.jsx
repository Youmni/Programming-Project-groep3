import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ehbLogo from "../assets/ehb-logo.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import WinkelMandje from "../pages/user/winkelmandje";
import axios from "axios";
import { IoLogOut } from "react-icons/io5";
import ChooseProduct from "./ChooseProduct";
import { WinkelMandjeContext } from "../contexts/winkelmandjeContext";

const NavBar = () => {
  const [clicked, setClicked] = useState(false);
  const [winkelMandje, setWinkelMandje] = useState(false);
  const [categories, setCategories] = useState([]);
  const { winkelmandje } = useContext(WinkelMandjeContext);
  const [search, setSearch] = useState("");
  const [productModellen, setProductModellen] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductModel, setSelectedProductModel] = useState(null);
  const node = useRef();
  const navigate = useNavigate();
  const nodeSearchResults = useRef();

  const handleClickOutside = (e) => {
    if (
      (node.current && node.current.contains(e.target)) ||
      (nodeSearchResults.current &&
        nodeSearchResults.current.contains(e.target))
    ) {
      return;
    }
    setClicked(false);
    setSearch("");
  };

  useEffect(() => {
    if (clicked || search.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clicked, search]);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

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

    axios
      .get("http://localhost:8080/productmodel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductModellen(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("winkelmandje");
    localStorage.removeItem("formData");
    navigate("/login");
  };

  const handleSearch = (e) => {
    const zoekTerm = e.target.value.toLowerCase();
    if (zoekTerm === "") {
      setSearch([]);
      return;
    }
    setSearch(
      productModellen.filter(
        (productModel) =>
          productModel.productModelNaam
            .toLowerCase()
            .includes(zoekTerm.toLowerCase()) ||
          productModel.productModelMerk
            .toLowerCase()
            .includes(zoekTerm.toLowerCase())
      )
    );
  };

  const openModal = (productModel) => {
    setSelectedProductModel(productModel);
    setShowModal(true);
    setSearch("");
    navigate("/inventaris");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="border flex flex-col lg:flex-row justify-center items-center h-auto gap-7 w-full shadow-lg">
      <div className="flex items-center justify-center gap-2 w-full lg:w-auto">
        <a href="/home">
          <img
            src={ehbLogo}
            alt="ehb Logo"
            className="h-16 ml-2 object-contain cursor-pointer"
          />
        </a>

        <div className="relative z-50" ref={node}>
          <div
            onClick={handleButtonClick}
            className="flex items-center justify-center hover:bg-zinc-200 cursor-pointer rounded-lg  p-2"
          >
            <span className="text-Grijs font-semibold">Categorieën</span>
            <IoIosArrowDown className="size-4 text-Grijs " />
          </div>
          {clicked && (
            <div className="origin-bottom absolute left-0 mt-4 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-center">
              <h3 className="text-lg">Categorieën</h3>
              <div className="flex flex-col">
                {categories.map((categorie, index) => (
                  <Link
                    to={`/inventaris/${categorie.categorieNr}`}
                    onClick={() => setClicked(false)}
                    key={index}
                    className="hover:bg-blue-500 p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {categorie.categorieNaam}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex lg:flex-grow w-full lg:w-auto justify-center items-center">
        <div className="flex lg:flex-grow sm:w-[350px]  h-12 border-2 items-center lg:justify-between rounded-lg gap-1 relative">
          <IoSearchOutline className="size-7 text-Grijs ml-2 transform transition-transform duration-250 hover:scale-110" />
          <input
            type="search"
            name="search-bar"
            id=""
            placeholder="Zoek hier naar een productmodel..."
            className="h-full w-full rounded-lg border-Lichtgrijs p-2 overflow-hidden"
            onChange={handleSearch}
          />

          {search.length > 0 && (
            <div
              ref={nodeSearchResults}
              className="absolute top-16 p-4 bg-white text-black w-full max-h-[600px] overflow-auto rounded-xl flex flex-col z-10 border"
            >
              <label className="font-semibold mb-2">Product Modellen</label>
              {search.map((productModel, index) => (
                <span
                  onClick={() => openModal(productModel)}
                  className="cursor-pointer p-2 hover:bg-blue-500 hover:text-white rounded-lg flex gap-4"
                  key={index}
                >
                  <p>{productModel.productModelMerk}</p>
                  <p>{productModel.productModelNaam}</p>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex h-full w-1/5 ml-5 items-center justify-evenly">
          <Link to={"/leningen"}>
            <FaUser className="size-14 text-Grijs p-2 transform transition-transform duration-250 hover:scale-110" />
          </Link>

          <button
            className="flex relative cursor-pointer transform transition-transform duration-250 hover:scale-110 "
            onClick={openWinkelMandje}
          >
            <BiShoppingBag className="text-5xl text-Grijs" />
            <div className="absolute w-5 h-5 rounded-full z-10 right-[-3px] bottom-[-3px] flex items-center justify-center text-[14px] bg-red-500 text-white">
              <span>{winkelmandje.length}</span>
            </div>
          </button>
          <div
            className="flex h-full items-center justify-evenly"
            style={{ width: "60px" }}
          >
            <IoLogOut
              className="size-14 text-Grijs p-2 cursor-pointer rounded-xl hover:text-rood transform transition-transform duration-250 hover:scale-110"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      {winkelMandje && <WinkelMandje closeWinkelMandje={closeWinkelMandje} />}
      {showModal && (
        <ChooseProduct
          productModelNr={selectedProductModel.productModelNr}
          productModelFoto={selectedProductModel.productModelFoto}
          closeModal={closeModal}
        />
      )}
    </nav>
  );
};

export default NavBar;
