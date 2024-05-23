import React, { useEffect } from "react";
import { SiAudioboom } from "react-icons/si";
import axios from "axios";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";



const Home = () => {
  const [categories, setCategories] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      enqueueSnackbar('Uw sessie is verlopen. Log opnieuw in.', { variant: 'error' });
      navigate("/login");
      return;
    }

    axios
      .get('http://localhost:8080/categorie', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setCategories(response.data);
        enqueueSnackbar('Categorieën opgehaald', { variant: 'success' });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        enqueueSnackbar('Error', { variant: 'error' });
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('authToken');
          navigate("/login");
        }
      });
  }, []);




  return (
    <main className="flex p-12">
      <div className="flex w-full flex-col h-auto gap-7">
        <h1 className="h-auto  text-4xl font-medium">Onze Categorieen</h1>
        <div className="flex flex-wrap h-auto flex-grow justify-evenly ">
          {categories.map((categorie) => (
            <Link
              to={`/inventaris/${categorie.categorieNr}`}
              className="flex flex-col h-[170px] w-[130px] border-2 rounded-xl items-center justify-center gap-6 hover:bg-gray-100  transform transition-transform duration-250 hover:scale-110"
              key={categorie.categorieNr}
            >
              <SiAudioboom className="size-14"/>
              <h2 className="text-3xl font-md">{categorie.categorieNaam}</h2>
            </Link>
          ))}
          <Link to={`/inventaris`} className="w-full flex justify-end items-center mr-6 mt-5 hover:underline text-xl">
            <p>Ga naar inventaris</p>
            <IoIosArrowForward />
            </Link>
        </div>
      </div>
    </main>
  ); 
};

export default Home;
