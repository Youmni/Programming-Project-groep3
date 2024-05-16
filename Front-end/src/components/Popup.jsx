import React, { useState } from "react";
import canonFoto from "../assets/canon-eos-200d.jpg";
import { FaCheckCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPause } from "react-icons/fa";
import { GiBrokenBone } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";







const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openPopup} className="bg-Grijs text-white py-1 px-1 rounded-xl flex items-center justify-center hover:bg-black"><FaCircleInfo className="size-6" /> </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white h-[95%] max-w-xl mx-auto p-12 pt-1 rounded-xl relative my-2">
            <section className="flex items-center gap-6">
              <img
                className="w-20 h-auto object-cover"
                src={canonFoto}
                alt="Product foto"
              />
              <div>
                <h2 className="font-bold text-2xl">Canon EOS 200D</h2>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-300 px-3 py-1 rounded-lg text-black text-sm">
                    Video
                  </div>
                  <p className="font-semibold">5x</p>
                </div>
              </div>
            </section>
            <section className="flex justify-between gap-1 mt-4">
              <div className="bg-green-500 px-1 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              <TiDelete />
                Beschikbaar
              </div>
              <div className="bg-blue-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              <TiDelete />
                Gepauzeerd
              </div>
              <div className="bg-yellow-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              <TiDelete />
                Gereserveerd
              </div>
              <div className="bg-orange-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              <TiDelete />
                Uitgeleend
              </div>
              <div className="bg-red-500 px-2 py-1 rounded-3xl text-white font-semibold flex items-center text-sm">
              <TiDelete />
                Beschadigd
              </div>
            </section>
            <section className="mt-4">
              <h2 className="font-bold mb-2 text-gray-500">Beschrijving</h2>
              <p className="text-gray-600">
                De Arduino Mega is een geavanceerd microcontroller-board met
                meer rekenkracht, geheugen en I/O-poorten dan de standaard
                Arduino Uno of Nano. Het is ideaal voor complexe elektronische
                projecten.
              </p>
            </section>
            <h2 className="font-bold mt-4 text-gray-500">Overzicht</h2>
            <section className="mt-2 border border-gray rounded-lg px-3 py-2 pl-4 pr-0">
              
            <section className="flex justify-start gap-6 mt-1">
              <div className="flex items-center border border-gray rounded-lg">
              <CiSearch className="ml-1 text-gray-500" />  {/* Verminderde margin-left */}
              <input className="pl-1 py-1 flex-1 rounded-r-lg focus:outline-none" type="text" placeholder="Product-ID" />  {/* Verminderde padding-left */}
              </div>

              <div className="flex items-center border border-gray rounded-lg">
              <select className="p-1 rounded-l-lg focus:outline-none text-gray-500">
                <option value="">status</option>
                <option value="beschikbaar">Beschikbaar</option>
                <option value="gepauzeerd">Gepauzeerd</option>
                <option value="gereserveerd">Gereserveerd</option>
                <option value="uitgeleend">Uitgeleend</option>
                <option value="beschadigd">Beschadigd</option>
              </select>
              </div>
              </section>
              <table className="w-full overflow-hidden">
                <thead>
                  <tr className="text-gray-500">
                    <th>Nr</th>
                    <th>Product ID</th>
                    <th>Status</th>
                    <th>Actie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-semibold">
                    
                    <td>01</td>
                    <td>#53050</td>
                    <td className="text-green-500 px-1 py-2 rounded-xl">
                      Beschikbaar
                    </td>
                    <td className="flex gap-2">
                      <button className="bg-blue-500 text-white p-2 rounded-lg">
                      <FaPause />
                      </button>
                      <button className="bg-brown text-white p-2 rounded-lg">
                      <GiBrokenBone />
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                      <MdDelete />
                      </button>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </section>
            <section className="flex justify-between gap-2 mt-10">
            <button
              onClick={closePopup}
              className="absolute bottom-6 left-12 text-gray-600"
            >
              terug
            </button>
            <div className="absolute bottom-4 right-12">
              <button className="bg-green-500 text-white px-4 py-2 rounded-3xl flex items-center gap-2">
              <FaCheckCircle className="w-5 h-5" />
                <span>Opslaan</span>
              </button>
            </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
