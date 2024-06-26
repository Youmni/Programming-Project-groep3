import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ChooseProduct from "../../components/ChooseProduct";
import BackUpImage from "../../assets/backup.jpg";
import { useAuth } from "../../components/AuthToken";

const inventarisCategorie = () => {
  const { categorieNr } = useParams();
  const [productModels, setProductModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProductModel, setSelectedProductModel] = useState(null);
  const [categorieNaam, setCategorieNaam] = useState("");

  useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`http://localhost:8080/productmodel/categorienr=${categorieNr}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      });
  }, [categorieNr]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProductModels = productModels.filter(
    (model) =>
      model.productModelNaam
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
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
          <span>/ {categorieNaam}</span>
        </h1>

        <div className="items-center flex h-full border-2 gap-2 rounded-xl bg-white border-Lichtgrijs">
          <IoSearchOutline className="ml-2 size-6" />
          <input
            type="search"
            name=""
            id=""
            placeholder="Zoek naar productmodellen..."
            className="h-full rounded-xl p-3"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </header>

      <section className="flex flex-wrap mt-5 gap-10 justify-center">
        {filteredProductModels.map((productModel) => (
          <figure
            onLoad={() => {
              setCategorieNaam(productModel.categorie.categorieNaam);
            }}
            key={productModel.productModelNr}
            onClick={() => openModal(productModel)}
            className="border bg-white w-[269px] rounded-2xl flex flex-col gap-2 p-5 relative shadow-md overflow-hidden pb-16 transition-transform transform hover:scale-110 cursor-pointer group"
          >
            <img
              src={
                productModel.productModelFoto
                  ? `/src/assets/ProductModelFotos/${productModel.productModelFoto}`
                  : BackUpImage
              }
              alt=""
              className="w-full h-24 object-contain shadow-md"
            />
            <div className="flex flex-col flex-wrap">
              <h1 className="text-2xl font-semibold max-h-8 w-full overflow-hidden text-ellipsis">
                {productModel.productModelNaam}
              </h1>
              <h2 className="text-gray-500">{productModel.productModelMerk}</h2>
              <div className="flex flex-col w-1/2 flex-wrap opacity-0 transition-opacity duration-100 group-hover:opacity-100">
                <h2 className="text-Lichtgrijs">Beschrijving</h2>
                <p className="text-sm max-h-24 overflow-hidden">
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
          productModelFoto={selectedProductModel.productModelFoto}
          closeModal={closeModal}
        />
      )}
    </main>
  );
};

export default inventarisCategorie;
