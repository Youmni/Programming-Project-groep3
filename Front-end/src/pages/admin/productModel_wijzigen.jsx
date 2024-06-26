import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import { TbBoxSeam } from "react-icons/tb";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import CategorieToevoegen from "../../components/categorieToevoegen";
import BackupImage from "../../assets/backup.jpg";
import { useAuth } from "../../components/AuthToken";

const ProductModelWijzigen = () => {
  const navigate = useNavigate();
  const { productModelNr } = useParams();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [formData, setFormData] = useState({
    productModelNaam: "",
    productModelMerk: "",
    categorie: {
      categorieNaam: "",
      categorieNr: "",
    },
    productModelBeschrijving: "",
    productModelFoto: "",
  });
  const [openCategoriePopup, setOpenCategoriePopup] = useState(false);
  useAuth();
  
  useEffect(() => {
    const fetchCategories = () => {
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
    };
    fetchCategories();

    const fetchProductModel = () => {
      axios
        .get(`http://localhost:8080/productmodel/id=${productModelNr}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFormData(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
    fetchProductModel();
  }, []);

  const handlechange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, [name]: file.name });
      }
    } else {
      if (name === "categorieNr") {
        const selectedCategory = categories.find(
          (categorie) => categorie.categorieNaam === value
        );
        setFormData({
          ...formData,
          categorie: {
            categorieNaam: value,
            categorieNr: selectedCategory
              ? String(selectedCategory.categorieNr)
              : "",
          },
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }

    if (value === "Categorie toevoegen.") {
      categorieToevoegen();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    const updatedFormData = {
      productModelNaam: formData.productModelNaam || "",
      productModelMerk: formData.productModelMerk || "",
      categorieNr: formData.categorie.categorieNr || "",
      productModelBeschrijving: formData.productModelBeschrijving || "",
      productModelFoto: formData.productModelFoto || "",
    };
    console.log(updatedFormData)
    axios
      .put(
        `http://localhost:8080/productmodel/${productModelNr}/wijzig`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        enqueueSnackbar("Product Model Gewijzigd", { variant: "success" });
        setFormData({
          productModelNaam: "",
          productModelMerk: "",
          categorie: {
            categorieNaam: "",
            categorieNr: "",
          },
          productModelBeschrijving: "",
          productModelFoto: "",
        });
        navigate("/admin/inventaris");
      })
      .catch((error) => {
        console.error("Error adding product model: ", error);
        enqueueSnackbar(
          "Error: Product Model niet gewijzigd, probeer het opnieuw",
          { variant: "error" }
        );
      });
  };

  const categorieToevoegen = () => {
    setOpenCategoriePopup(true);
  };

  const closeCategoriePopup = () => {
    setOpenCategoriePopup(false);
  };

  return (
    <div className="top-0  flex-grow">
      <main className="flex-grow  p-10 ">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-centr">
            Inventaris
          </h1>
          <div className="flex items-center gap-10">
            <Link
              to="/admin/inventaris"
              className="hover:text-red-400 underline"
            >
              Annuleren
            </Link>
            <button
              onClick={onSubmit}
              className="rounded-xl bg-Groen items-center justify-center flex gap-3 p-2 px-3 hover:bg-lime-300"
            >
              <MdOutlineAddCircle className="flex size-7" />
              <h2 className="font-semibold text-lg">Wijzigen</h2>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-10 flex-wrap">
          <breadcrumb className="flex items-center gap-2">
            <TbBoxSeam className="text-rood" />
            <Link
              to={`/admin/inventaris`}
              className="hover:text-red-400 underline"
            >
              <breadcrumb-item>Inventaris </breadcrumb-item>
            </Link>
            <breadcrumb-item>/ Product model wijzigen</breadcrumb-item>
          </breadcrumb>
        </div>
        <div className="flex w-full h-auto flex-wrap mt-5 px-8">
          <form onSubmit={onSubmit} className="flex w-full h-full gap-20">
            <div className="flex flex-col w-1/2 border rounded-lg gap-8 p-5">
              <div className="flex flex-col w-3/4 text-Grijs">
                <label htmlFor="text">Product Model Naam</label>
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
                <label htmlFor="">Product Model Merk</label>
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
                  value={formData.categorie?.categorieNaam}
                  onChange={handlechange}
                  name="categorieNr"
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
                  <option>Categorie toevoegen.</option>
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
            {/* <div className="flex flex-col w-1/2 border ">
              <div className="flex flex-col w-ful gap-2 mt-5 ml-8 ">
                <label htmlFor="">Foto Toevoegen</label>
                <input
                  type="file"
                  name="productModelFoto"
                  accept=".jpg, .jpeg, .png"
                  placeholder="Foto Toevoegen"
                  className="w-96 h-7 pl-2"
                  onChange={handlechange}
                />
                {formData.productModelFoto && (
                  <p>{formData.productModelFoto}</p>
                )}
                <img
                  src={
                    formData.productModelFoto
                      ? `/src/assets/ProductModelFotos/${formData.productModelFoto}`
                      : BackupImage
                  }
                  alt="Selected"
                  className="w-40 h-auto object-cover"
                />
              </div>
            </div> */}
          </form>
        </div>
        {openCategoriePopup && (
          <CategorieToevoegen onClose={() => closeCategoriePopup()} />
        )}
      </main>
    </div>
  );
};

export default ProductModelWijzigen;
