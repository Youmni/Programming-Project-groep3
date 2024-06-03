import React, { useEffect, useState } from "react";
import { FaPause } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineBrokenImage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import BeschadigingPopup from "./BeschadigingPopup";
import BackupImage from "../assets/backup.jpg";
import { useAuth } from "./AuthToken";

const PopupProduct = ({ onClose, model }) => {
  const [producten, setProducten] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState({});
  const [showBeschadigingPopup, setShowBeschadigingPopup] = useState(false);
  
  const navigate = useNavigate();
  useAuth();

  const fetchProducten = () => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`http://localhost:8080/product/model=${model.productModelNr}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducten(response.data);
        enqueueSnackbar("Producten opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar(
          "Er is iets fout gegaan bij het ophalen van de producten",
          { variant: "error" }
        );
      });
  };

  useEffect(() => {
    fetchProducten();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducten = producten.filter(
    (product) =>
      product.productNaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(product.productID)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const pauzeerProduct = (product) => {
    const token = localStorage.getItem("authToken");
    const newStatus =
      product.status === "Gepauzeerd" ? "Beschikbaar" : "Gepauzeerd";

    axios
      .put(
        `http://localhost:8080/product/${product.productID}/bewerk-status?newStatus=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar(`Product is ${newStatus}`, { variant: "success" });
        console.log(response.data);
        fetchProducten();
      })
      .catch((error) => {
        console.error("Error pauzeren product: ", error);
        enqueueSnackbar(
          "Error: Product niet gepauzeerd, probeer het opnieuw" + error,
          {
            variant: "error",
          }
        );
      });
  };

  const deleteProduct = (product) => {
    const token = localStorage.getItem("authToken");

    axios
      .delete(`http://localhost:8080/product/${product.productID}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        enqueueSnackbar("Product verwijderd", { variant: "success" });
        console.log(response.data);
        fetchProducten(); // Refetch the product data to update the UI
      })
      .catch((error) => {
        console.error("Error verwijderen product: ", error);
        enqueueSnackbar("Error: Product niet verwijderd, probeer het opnieuw", {
          variant: "error",
        });
      });
  };

  const beschadigingToevoegen = (product) => {
    setProduct(product);
    setShowBeschadigingPopup(true);
  };

  const closeBeschadigingPopup = () => {
    setShowBeschadigingPopup(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Beschikbaar":
        return "text-green-500";
      case "Gepauzeerd":
        return "text-blue-500";
      case "Beschadigd":
        return "text-red-700";
      case "Gereserveerd":
        return "text-yellow-500";
      default:
        return "text-black";
    }
  };

  const statusCounts = producten.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-2xl h-[90%] w-[60%] relative shadow-md">
        <section className="flex items-center gap-8 ">
          <img
            className="w-24 h-auto object-cover"
            src={
              model.productModelFoto
                ? `/src/assets/ProductModelFotos/${model.productModelFoto}`
                : BackupImage
            }
            alt="Product foto"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl">
              <span>{model.productModelNaam} </span>
              <span>{model.productModelMerk}</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="bg-slate-300 py-1 px-6 rounded-lg text-black text-lg">
                {model.categorie.categorieNaam}
              </div>
              <p className="font-semibold text-xl">x{producten.length}</p>
            </div>
          </div>
        </section>
        <section className="flex justify-start flex-wrap gap-5 mt-4">
          {statusCounts["Beschikbaar"] && (
            <div className="bg-green-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Beschikbaar ({statusCounts["Beschikbaar"]})
            </div>
          )}
          {statusCounts["Gepauzeerd"] && (
            <div className="bg-blue-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Gepauzeerd ({statusCounts["Gepauzeerd"]})
            </div>
          )}
          {statusCounts["Gereserveerd"] && (
            <div className="bg-yellow-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Gereserveerd ({statusCounts["Gereserveerd"]})
            </div>
          )}
          {statusCounts["Uitgeleend"] && (
            <div className="bg-orange-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Uitgeleend ({statusCounts["Uitgeleend"]})
            </div>
          )}
          {statusCounts["Beschadigd"] && (
            <div className="bg-red-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              Beschadigd ({statusCounts["Beschadigd"]})
            </div>
          )}
        </section>
        <section className="mt-4">
          <h2 className="font-bold mb-2 text-gray-700 text-xl">Beschrijving</h2>
          <p className="text-gray-600">{model.productModelBeschrijving}</p>
        </section>
        <h2 className="font-bold mt-4 text-gray-700 text-xl">Overzicht</h2>
        <section className="mt-2 border-2 flex flex-col h-1/2 overflow-y-auto border-gray rounded-lg p-3">
          <section className="flex justify-start gap-6 sticky top-0 z-50 bg-white">
            <div className="flex items-center border border-gray-700 rounded-lg p-2 gap-2 w-[40%]">
              <CiSearch className="text-gray-500 font-bold" size={18} />{" "}
              <input
                className="outline-none text-lg w-full"
                type="text"
                placeholder="Product-ID"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center border border-gray-700 rounded-lg">
              <select className="p-2 rounded-lg  text-black outline-none text-lg">
                <option value="">status</option>
                <option value="beschikbaar">Beschikbaar</option>
                <option value="gepauzeerd">Gepauzeerd</option>
                <option value="gereserveerd">Gereserveerd</option>
                <option value="uitgeleend">Uitgeleend</option>
                <option value="beschadigd">Beschadigd</option>
              </select>
            </div>
          </section>
          <table className="w-full h-auto">
            <thead className="w-full items-center h-16">
              <tr className="text-sm text-Lichtgrijs font-thin ">
                <th scope="col" className=" px-2 ">
                  Nr
                </th>
                <th
                  scope="col"
                  className="text-left hover:cursor-pointer w-80 "
                >
                  Product Id
                </th>
                <th scope="col" className="text-left">
                  Status
                </th>
                <th
                  scope="col"
                  className=" flex h-full justify-end items-center  gap-1"
                >
                  Actie
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducten.map((product, index) => (
                <tr key={product.productID} className="h-12 w-auto font-bold">
                  <td className="text-center h-full">{index+1}</td>
                  <td className="">#{product.productID}</td>
                  <td className={getStatusColor(product.status)}>
                    {product.status}
                  </td>
                  <td className="text-end space-x-1">
                    <button
                      title="Pauzeren"
                      onClick={() => {
                        pauzeerProduct(product);
                      }}
                      className={`p-2 rounded-xl ${
                        product.status === "Gepauzeerd"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } transform transition-transform duration-250 hover:scale-110`}
                    >
                      {product.status === "Gepauzeerd" ? (
                        <FaPlay className="text-white" />
                      ) : (
                        <FaPause className="text-white" />
                      )}
                    </button>
                    <button
                      title="Beschadigingen"
                      onClick={() => {
                        beschadigingToevoegen(product);
                      }}
                      className="bg-red-900 p-2 rounded-xl transform transition-transform duration-250 hover:scale-110"
                    >
                      <MdOutlineBrokenImage className="text-white" />
                    </button>
                    <button
                      title="delete"
                      onClick={() => {
                        deleteProduct(product);
                      }}
                      className="bg-red-500 p-2 rounded-xl transform transition-transform duration-250 hover:scale-110"
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="flex justify-between absolute bottom-8 px-10 left-0 w-full items-center">
          <button onClick={onClose} className="text-xl hover:underline">
            terug
          </button>
        </section>
      </div>
      {showBeschadigingPopup && (
        <BeschadigingPopup onClose={closeBeschadigingPopup} productObject={product} />
      )}
    </div>
  );
};

export default PopupProduct;
