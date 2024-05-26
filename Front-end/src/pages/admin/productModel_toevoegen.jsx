import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

const ProductModelToevoegen = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productModelNaam: "",
    productModelMerk: "",
    categorieNaam: "",
    productModelBeschrijving: "",
    productModelFoto: "",
  });
  console.log(formData);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      enqueueSnackbar('Uw sessie is verlopen. Log opnieuw in.', { variant: 'error' });
      navigate("/login");
      return;
    }
    // fetch Categories
    axios
      .get("http://localhost:8080/categorie", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setCategories(response.data);
        enqueueSnackbar("Categorieën opgehaald", {variant: "success"});
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error: Categorieën niet opgehaald", {variant: "error"});
      });
  }, []);

  const handlechange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    const updatedFormData = {
      ...formData,
    }
    console.log(updatedFormData);
    axios
    .post("http://localhost:8080/productmodel/toevoegen", updatedFormData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      enqueueSnackbar("Product Model toegevoegd", { variant: "success" });
      console.log("Product Model Toegevoegd",response.data);
      navigate("/admin/inventaris");
    })
    .catch(error => {
      console.error("Error adding product model: ", error);
      enqueueSnackbar("Error: Product Model niet toegevoegd, probeer het opnieuw", { variant: "error" });

      setFormData({
        productModelNaam: "",
        productModelMerk: "",
        categorieNaam: "",
        productModelBeschrijving: "",
        productModelFoto: "",
      })
    })
    
  }


    
  

  return (
    <content className="top-0 flex-grow">
      <main className="flex-grow p-10 ">
        <div className="flex justify-between items-center">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-center">
            Inventaris
          </h1>
          <div className="flex items-center gap-10">
            <Link to="/admin/inventaris" className="hover:text-red-400 underline">
              Annuleren
            </Link>
            <button
              onClick={onSubmit}
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
            <breadcrumb-item>/ Product model toevoegen</breadcrumb-item>
          </breadcrumb>
        </div>
        <div className="flex flex-grow h-full mt-5 ml-8 ">
          <form onSubmit className="flex w-full h-full gap-20">
            <div className="flex flex-col w-1/2 border rounded-lg gap-8 p-5">
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="text">Product Naam</label>
                <input
                  type="text"
                  name="productModelNaam"
                  className=" h-10 pl-4 rounded-xl bg-red-100"
                  required
                  value={formData.productModelNaam}
                  onChange={handlechange}
                  
                />
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Product Merk</label>
                <input
                  type="text"
                  name="productModelMerk"
                  className=" h-10 pl-4   rounded-xl bg-red-100"
                  required
                  value={formData.productModelMerk}
                  onChange={handlechange}
                />
              </div>
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="">Product Categorie</label>
                <select
                  className=" h-10 pl-4 rounded-xl bg-red-100"
                  required
                  value={formData.categorieNaam}
                  onChange={handlechange}
                  name="categorieNaam"
                >
                  <option value="">Selecteer Categorie</option>
                  {categories.map((categorie) => (
                    <option
                      key={categorie.categorieNr}
                      value={categorie.categorieNaam}
                    >
                      {categorie.categorieNaam}
                    </option>
                  ))}
                  <option onClick>Categorie toevoegen.</option>
                </select>
              </div>
              
              <div className="flex flex-col w-3/4 text-Grijs">
                <label>Beschrijving</label>
                <textarea
                  type="text"
                  name="productModelBeschrijving"
                  placeholder="Voer een beschrijving in."
                  className=" h-24 p-3 rounded-xl bg-red-100"
                  value={formData.productModelBeschrijving}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2 border ">
              <div className="flex flex-col w-ful gap-2 mt-5 ml-8 ">
                <label htmlFor="">Foto Toevoegen</label>
                <input
                  type="file"
                  name="productModelFoto"
                  accept=".jpg, .jpeg, .png"
                  placeholder="Foto Toevoegen"
                  className="w-96 h-7 pl-2"
                  value={formData.productModelFoto}
                  onChange={handlechange}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </content>
  );
};

export default ProductModelToevoegen;

