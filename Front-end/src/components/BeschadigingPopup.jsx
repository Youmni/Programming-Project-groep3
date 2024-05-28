import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaPause, FaPlay } from 'react-icons/fa';
import { MdDelete, MdOutlineBrokenImage } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import  {TiDelete} from 'react-icons/ti';
import canonFoto from '../assets/canon-eos-200d.jpg';
import { IoIosAddCircle } from "react-icons/io";


const BeschadigingPopup = ({product , onClose}) => {
    console.log(product)

    const[beschadigingen, setBeschadigingen] = useState([]);
    const[searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        axios
        .get(`http://localhost:8080/beschadiging/productid=${product.productID}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setBeschadigingen(response.data);
            console.log("Beschadigingen succesvol toegevoegd",response.data);
        })
        .catch((error) => {
            console.error("Er is iets fout gegaan bij het toevoegen van de beschadigingen", error);
        })
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    const beschadigingToevoegen = () => {

    }

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50">
          <div className="bg-white p-10 rounded-2xl h-[90%] w-[60%] relative shadow-md">
          <section className="flex gap-3 items-start">
          <div className="flex flex-col items-center text-black justify-center gap-2">
          <img
            className="w-24 h-auto object-cover"
            src={canonFoto}
            alt="Product foto"
          />
            <div className="bg-blue-200 py-1 px-6 rounded-lg text-black text-lg">
                <h2>{product.productModelNr.categorie.categorieNaam}</h2>
            </div>
          </div>
            <div className="text-lg flex  flex-col items-start mt-3">
              <h2 className="font-bold text-2xl">{product.productNaam} </h2>
              <h3>{product.productID}</h3>
            </div>
        </section>
            <section className="mt-4">
            </section>
            <h2 className="font-bold mt-4 text-gray-700 text-xl">Beschadigingen</h2>
            <section className="mt-2 border-2 flex flex-col max-h-[calc(100%-50px)] overflow-y-auto border-gray rounded-lg p-3">
              <section className="flex justify-start gap-6 sticky top-0 z-50 bg-white">
                <div className="flex items-center border border-gray-700 rounded-lg p-3 gap-2 w-[40%]">
                  <CiSearch className="text-gray-500 font-bold" size={18} />{" "}
                  <input
                    className="outline-none text-lg"
                    type="text"
                    placeholder="Product-ID"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </section>
              <table className="w-full h-full">
                <thead className="w-full items-center h-16">
                  <tr className="text-sm text-Lichtgrijs font-thin ">
                    <th scope="col" className=" px-2 ">
                      Nr
                    </th>
                    <th
                      scope="col"
                      className="text-left "
                    >
                      Beschadiging Id
                    </th>
                    <th scope="col" className="text-left">
                      Beschadigd door
                    </th>
                    <th scope="col" className="text-left">
                      Uitgeleeend op
                    </th>
                    <th scope="col" className="text-left">
                      Uitgeleend tot
                    </th>
                    <th scope="col" className="text-right">
                      Actie
                    </th>
                  </tr>
                </thead>
                <tbody >
                  {beschadigingen.map((beschadiging, index) => (
                    <tr key={beschadiging} className="h-12 w-auto ">
                      <td className="text-center h-full">
                        {index}
                        </td>
                      <td className="">
                        #{beschadiging}
                      </td>
                      <td className="">
                        Naam{beschadiging}
                      </td>
                      <td className="">
                        Op{beschadiging}
                      </td>
                      <td className="">
                        Tot{beschadiging}
                      </td>
                      <td className="text-end">
                        <button title='Beschadiging info' onClick={() =>{beschadigingToevoegen()}} className= "p-2 bg-gray-800 rounded-xl">
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="flex justify-between absolute bottom-6 left-0 px-10 w-full items-center">
              <button onClick={onClose} className="text-xl hover:underline">
                terug
              </button>
            </section>
            <button className='absolute top-10 right-10 bg-Groen text-black px-6 py-2 rounded-2xl flex items-center gap-2 text-2xl transform transition-transform duration-250 hover:scale-110'>
                <IoIosAddCircle size={20}/>
                Toevoegen
                </button>
          </div>
        </div>
      );
    };

export default BeschadigingPopup