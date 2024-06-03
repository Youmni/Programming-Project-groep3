import React, { useEffect, useState } from "react";
import { TbBoxSeam } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import KeuzePopup from "../../components/keuzePopup";
import { FaCircleInfo } from "react-icons/fa6";
import PopupProduct from "../../components/PopupProduct";
import BackupImage from "../../assets/backup.jpg";
import ProductDetailsReservatie from "../../components/ProductDetailsReservatie";
import { useAuth } from "../../components/AuthToken";

const Inventaris = () => {
  const [productModellen, setProductModellen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showKeuzePopup, setShowKeuzePopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const navigate = useNavigate();
  const location = useLocation();
  useAuth();

  const url = location.state?.url || "http://localhost:8080/productmodel";



  useEffect(() => {

    setLoading(true);
    // Fetch product models
    axios
      .get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setProductModellen(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });

    // Fetch categories
    axios
      .get("http://localhost:8080/categorie", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProductModellen = productModellen.filter((model) =>
    model.productModelNaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.productModelMerk.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.categorie.categorieNaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(model.productModelNr).toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedProductModellen = filteredProductModellen.sort((a, b) => a.productModelNr - b.productModelNr);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-red-200 h-16 w-16"></div>
      </div>
    );
  }

  const openKeuzePopup = () => {
    setShowKeuzePopup(true);
  };
  const closeKeuzePopup = () => {
    setShowKeuzePopup(false);
  };

  const openProductPopup = (model) => {
    setSelectedModel(model);
    setShowProductPopup(true);
  };
  const closeProductPopup = () => {
    setShowProductPopup(false);
  };

  if (showKeuzePopup || showProductPopup) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <content className="top-0 flex-grow">
      <main className="flex-grow p-10 ">
        <div className="flex justify-between items-center w-auto">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-center">
            Inventaris
          </h1>
          <button
            onClick={openKeuzePopup}
            className="w-48 rounded-xl bg-Groen h-12 items-center justify-center flex gap-2 p-2 hover:bg-lime-400"
          >
            <MdOutlineAddCircle className="flex size-6" />
            <h2 className="font-semibold">Product Toevoegen</h2>
          </button>
        </div>
        <div className="flex items-center gap-2 mt-10 ml-5 w-auto justify-between">
          <breadcrumb className="flex items-center gap-2">
            <TbBoxSeam className="text-rood" />
            <breadcrumb-item>Inventaris</breadcrumb-item>
          </breadcrumb>
          <div className="items-center flex h-12 gap-4">
            <div className="items-center flex h-full border-2 w-80 gap-2 rounded-xl border-Lichtgrijs hover:border-black">
              <IoSearchOutline className="ml-2 size-6" />
              <input
                type="search"
                name=""
                id=""
                placeholder="Zoek op naam, merk, categorie of Nr"
                className="h-full w-full rounded-xl p-2 outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <div className="flex w-auto h-auto">
          <div>{loading && <Spinner />}</div>
          <table className="w-full h-full">
            <thead className="w-full items-center h-16">
              <tr className="text-sm text-Lichtgrijs font-thin">
                <th scope="col" className=" px-2 ">
                  Nr
                </th>
                <th
                  scope="col"
                  className="text-left hover:cursor-pointer w-80 "
                >
                  Product Model
                </th>
                <th scope="col" className="text-left">
                  Categorie
                </th>
                <th scope="col" className="text-right">
                  Actie
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProductModellen.map((model) => (
                <tr key={model.productModelNr} className="h-16 w-auto">
                  <td className="text-center h-full">
                    {model.productModelNr}
                  </td>
                  <td className="">
                    <div className="flex items-center justify-start gap-2 overflow-x-hidden">
                      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-Lichtgrijs">
                        <img
                          src={model.productModelFoto ? `/src/assets/ProductModelFotos/${model.productModelFoto}` : BackupImage}
                          alt=""
                          className="w-auto h-full object-cover"
                        />
                      </div>
                      <h2 className="flex flex-col -space-y-1">
                        <span className="text-base text-black font-semibold">{`${model.productModelNaam}`}</span>
                        <span className="text-sm text-Lichtgrijs">{`${model.productModelMerk}`}</span>
                      </h2>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex w-28  h-10 bg-slate-300 items-center justify-center rounded-md">
                      <h2 className="text-lg">{`${model.categorie.categorieNaam.charAt(0).toUpperCase()}${model.categorie.categorieNaam.slice(1)}`}
                      </h2>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex justify-end items-center gap-2">
                      <Link
                        to={`/admin/inventaris/wijzigen/${model.productModelNr}`}
                        className="bg-cyan-600 text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-cyan-900"
                      >
                        <HiMiniPencilSquare className="size-6" />
                      </Link>
                      <button onClick={() => openProductPopup(model)} className="bg-Grijs text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-black"><FaCircleInfo className="size-6" /> </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showKeuzePopup && <KeuzePopup onClose={closeKeuzePopup} />}
        {showProductPopup && <PopupProduct onClose={closeProductPopup} model={selectedModel} />}
      </main>
    </content>
  );
};

export default Inventaris;