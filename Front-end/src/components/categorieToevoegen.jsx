import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "./AuthToken";

const CategorieToevoegen = ({ onClose }) => {
  const [formData, setFormData] = useState({
    categorieNaam: "",
  });
  useAuth();

  const handlechange = (event) => {
    const { name, value }= event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    const updatedFormData = {
      ...formData,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/categorie/toevoegen",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Categorie toegevoegd", { variant: "success" });
      console.log("Catgorie succesvol toegevoegd", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding product categorie: ", error);
      enqueueSnackbar(
        "Error: Categorie niet toegevoegd, probeer het opnieuw",
        { variant: "error" }
      );
      setFormData({
        categorieNaam: "",
      });
    }
  };



  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg min-h-[40%] w-1/2 relative shadow-md">
        <section className="w-full h-full rounded-lg">
          <form onSubmit={onSubmit} className="flex w-full h-full gap-20">
            <div className="flex flex-col gap-10 w-full rounded-lg p-5">
              <h1 className="text-3xl font-medium">Categorie Toevoegen</h1>
              <div className="flex flex-col gap-1 w-3/4">
                <label>Categorie Naam</label>
                <input
                  type="text"
                  name="categorieNaam"
                  placeholder="Geef de categorie naam in..."
                  className=" h-10 pl-4 rounded-xl bg-red-100"
                  required
                  value={formData.categorieNaam}
                  onChange={handlechange}
                />
              </div>
              <div className="flex items-center absolute bottom-0 left-0 justify-between w-full p-5 gap-10">
                <button
                  onClick={onClose}
                  className="hover:text-red-400 underline"
                >
                  Annuleren
                </button>
                <button
                  onClick={onSubmit}
                  className="w-40 rounded-xl bg-Groen h-12 items-center justify-center flex gap-3 p-2 hover:bg-lime-300"
                >
                  <MdOutlineAddCircle className="flex size-7" />
                  <h2 className="font-semibold text-lg">Toevoegen</h2>
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default CategorieToevoegen;
