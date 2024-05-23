import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import canonFoto from "../../assets/canon-eos-200d.jpg";
import { FaShoppingBag } from "react-icons/fa";
import ReserveringForm from "./reserveringform";
import { Link, useNavigate } from "react-router-dom";

const Inventaris = () => {
  const [Inventaris, setInventaris] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedProductNr, setSelectedProductNr] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
        variant: "error",
      });
      navigate("/login");
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:8080/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setInventaris(res.data);
        enqueueSnackbar("Inventaris opgehaald", { variant: "success" });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error", { variant: "error" });
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducten = Inventaris.filter((model) =>
    model.productNaam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedProductNr(product.productID);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center flex-col space-y-2 items-center h-screen">
        <h1>Even geduld, het inventaris wordt ingeladen</h1>
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <main className="flex p-12 w-full flex-col bg-slate-50">
      <header className="flex justify-between w-full ">
        <h1 className="font-semibold text-3xl">Inventaris</h1>
        <div className="flex gap-5">
          <div className="items-center flex h-full border-2 gap-2 rounded-xl border-Lichtgrijs bg-white">
            <IoSearchOutline className="size-6 ml-3" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Zoek naar producten..."
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
      <content className="flex flex-wrap mt-5 gap-10 justify-center">
        {filteredProducten.map((product) => (
          <figure
            key={product.productnr}
            className="border min-h-[170px] bg-white w-[270px] rounded-2xl flex flex-col gap-2 p-5 relative shadow-md"
          >
            <img
              src={canonFoto}
              alt=""
              className="w-full h-16 object-contain"
            />
            <div className="flex flex-col flex-wrap ">
              <h1 className="text-2xl font-semibold overflow-hidden">
                {product.productNaam}
              </h1>
              <div className="flex flex-col w-3/5 flex-wrap">
                <h2 className="text-Lichtgrijs">ProductBeschrijving</h2>
                <p className="text-sm">Dit is de beschrijving</p>
              </div>
            </div>
            <button
              className="h-14 w-20 border rounded-xl bg-blue-800 justify-center absolute bottom-4 right-4 items-center flex p-2 shadow-lg hover:bg-blue-950"
              onClick={() => openModal(product)}
            >
              <FaShoppingBag className="size-6 text-white" />
            </button>
          </figure>
        ))}
      </content>
      {showModal && (
        <ReserveringForm closeModal={closeModal} product={selectedProduct} productNr={selectedProductNr} />
      )}
    </main>
  );
};

export default Inventaris;
