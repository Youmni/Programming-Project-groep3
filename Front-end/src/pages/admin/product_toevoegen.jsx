import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const ProductToevoegen = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productModelNaam: "",
    productModelMerk: "",
    categorieNaam: "",
    aantal: 0,
    productModelBeschrijving: "",
    productModelFoto: "",
  });

  useEffect(() => {
    // fetch Categories
    axios
      .get("http://localhost:8080/categorie")
      .then((response) => {
        setCategories(response.data);
        enqueueSnackbar("Categorieën opgehaald", {variant: "success"});
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error: Categorieën niet opgehaald", {variant: "error"});
      });
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     productModelFoto: file,
  //   }));
  // };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      categorieNaam: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    

    const formDataToSend = new FormData();
    formDataToSend.append("productModelNaam", formData.productModelNaam);
    formDataToSend.append("productModelMerk", formData.productModelMerk);
    formDataToSend.append("categorieNaam", formData.categorieNaam);
    formDataToSend.append("aantal", formData.aantal);
    formDataToSend.append(
      "productModelBeschrijving",
      formData.productModelBeschrijving
    );
    formDataToSend.append("productModelFoto", formData.productModelFoto);
    axios
      .post("http://localhost:8080/productmodel", formDataToSend)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        enqueueSnackbar("Product toegevoegd", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
        enqueueSnackbar("Error: Product niet toegevoegd", { variant: "error" });
      });
  

  return (
    <content className="top-0 flex-grow">
      <main className="flex-grow p-10">
        <div className="flex justify-between items-center">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-center">
            Inventaris
          </h1>
          <div className="flex items-center gap-10">
            <Link to="/admin/inventaris" className="hover:text-red-400 underline">
              Annuleren
            </Link>
            <button
              onClick
              className="w-40 rounded-xl bg-Groen h-12 items-center justify-center flex gap-3 p-2 hover:bg-lime-300"
            >
              <MdOutlineAddCircle className="flex size-7" />
              <h2 className="font-semibold text-lg">Toevoegen</h2>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-10 ml-5  justify-between">
          <breadcrumb className="flex items-center gap-2">
            <RxDashboard className="text-rood" />
            <Link to={`/admin/inventaris`} className="hover:text-red-400 underline">
              <breadcrumb-item>Inventaris </breadcrumb-item>
            </Link>
            <breadcrumb-item>/ Product toevoegen</breadcrumb-item>
          </breadcrumb>
        </div>
        <div className="flex flex-grow h-full mt-5 ml-8 ">
          <form onSubmit className="flex w-full h-full gap-20">
            <div className="flex flex-col w-1/2 border rounded-lg gap-8 p-5">
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Product Naam</label>
                <input
                  type="text"
                  placeholder="Voer naam in."
                  className=" h-10 pl-4 rounded-xl bg-red-50"
                  required
                  value={formData.productModelNaam}
                  
                />
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Product Merk</label>
                <input
                  type="text"
                  placeholder="Voer merk in."
                  className=" h-10 pl-4   rounded-xl bg-red-50"
                  required
                  value={formData.productModelMerk}
                  onChange
                />
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Product Categorie</label>
                <select
                  className=" h-10 pl-4 rounded-xl bg-red-50"
                  required
                  value={formData.categorieNaam}
                  onChange={handleSelectChange}
                >
                  <option value="">Selecteer Categorie</option>
                  {categories.map((categorie) => (
                    <option
                      key={categorie.categorieId}
                      value={categorie.categorieNaam}
                    >
                      {categorie.categorieNaam}
                    </option>
                  ))}
                  <option onClick>Categorie toevoegen.</option>
                </select>
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Aantal</label>
                <input
                  type="number"
                  placeholder="Voer aantal in."
                  className=" h-10 pl-4 rounded-xl bg-red-50"
                  required
                  value={formData.aantal}
                  onChange
                />
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label>Beschrijving</label>
                <textarea
                  type="text"
                  placeholder="Voer een beschrijving in."
                  className=" h-24 p-3 rounded-xl bg-red-50"
                  value={formData.productModelBeschrijving}
                  onChange
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2 border">
              <div className="flex flex-col w-ful gap-2">
                <label htmlFor="">Foto Toevoegen</label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  placeholder="Foto Toevoegen"
                  className="w-96 h-7 pl-2"
                  value={formData.productModelFoto}
                  onChange
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </content>
  );
};

export default ProductToevoegen;
