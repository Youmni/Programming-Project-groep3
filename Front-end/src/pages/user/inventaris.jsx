import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import ChooseProduct from "../../components/ChooseProduct";
import BackUpImage from "../../assets/backup.jpg";
import { useAuth } from "../../components/AuthToken";

const inventarisCategorie = () => {
  const [productModels, setProductModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProductModel, setSelectedProductModel] = useState(null);

  const navigate = useNavigate();
  useAuth();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`http://localhost:8080/productmodel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductModels(response.data);
        console.log(response.data);
        enqueueSnackbar("Productmodellen opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error", { variant: "error" });
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProductModels = productModels.filter((model) =>
    model.productModelNaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.productModelMerk.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (productModel) => {
    setSelectedProductModel(productModel);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex p-12 w-full flex-col bg-slate-50 z-0">
      <header className="flex justify-between w-full ">
        <h1 className="font-semibold text-3xl">
          <Link className="hover:underline" to={`/inventaris`}>
            <span>Inventaris </span>
          </Link>
        </h1>
        <div className="flex gap-5">
          <div className="items-center flex h-full border-2 gap-2 rounded-xl border-Lichtgrijs">
            <IoSearchOutline className="ml-2 size-6" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Zoek naar productmodellen..."
              className="h-full rounded-xl p-2"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex h-full items-center justify-center gap-2 p-2 border-2 rounded-xl bg-white">
            <FaFilter className="size-4 text-black-600" />
            <h2 className="text-xl font-semibold">Filter</h2>
          </div>
        </div>
      </header>
      <section className="flex flex-wrap mt-5 gap-10 justify-center">
        {filteredProductModels.map((productModel) => (
          <figure
            key={productModel.productModelNr}
            onClick={() => openModal(productModel)}
            className="border  bg-white w-[269px] rounded-2xl flex flex-col gap-2 p-5 relative shadow-md overflow-auto pb-16 transition-transform transform hover:scale-110 cursor-pointer"
          >
            <img
              src={productModel.productModelFoto ? `/src/assets/ProductModelFotos/${productModel.productModelFoto}` : BackUpImage}
              alt={productModel.productModelNaam}
              className="w-full h-24 object-contain shadow-md"
            />
            <div className="flex flex-col flex-wrap ">
              <h1 className="text-2xl font-semibold overflow-hidden">
                {productModel.productModelNaam}
              </h1>
              <div className="flex flex-col w-3/5 flex-wrap">
                <h2 className="text-Lichtgrijs">ProductModelBeschrijving</h2>
                <p className="text-sm">
                  {productModel.productModelBeschrijving === null
                    ? "geen beschrijving beschikbaar"
                    : productModel.productModelBeschrijving}
                </p>
              </div>
            </div>
            <button
              className="h-14 w-20 border rounded-xl bg-blue-800 justify-center absolute bottom-4 right-4 items-center flex p-2 shadow-lg hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => openModal(productModel)}
            >
              <FaBox className="size-6 text-white" />
            </button>
          </figure>
        ))}
      </section>

      {showModal && (
  <ChooseProduct
    productModelNr={selectedProductModel.productModelNr}
    closeModal={closeModal}
    
  />
)}

    </main>
  );
};

export default inventarisCategorie;
