import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiAudioboom } from "react-icons/si";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";



const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/categorie")
      .then((response) => {
        setCategories(response.data);
        enqueueSnackbar("Categorieën opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error", { variant: "error" });
      });
  }, []);



  return (
    <main className="flex p-12 ml-4 w-screen">
      <div className="flex w-full flex-col h-auto gap-7">
        <h1 className="flex h-auto  text-4xl font-medium">Categorieen</h1>
        <div className="flex flex-wrap h-auto gap-6 w-full">
          {categories.map((categorie) => (
            <Link
              to={`/inventaris/${categorie.categorieNaam}`}
              className="flex flex-col h-[170px] w-[130px] border-2 rounded-xl items-center justify-center gap-6 hover:bg-gray-100 "
              key={categorie.categorieNr}
            >
              <SiAudioboom className="size-14"/>
              <h2 className="text-3xl font-md">{categorie.categorieNaam}</h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
