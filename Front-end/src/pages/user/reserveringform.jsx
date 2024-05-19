import React from "react";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";


const reserveringForm = ({closeModal, product}) => {

  console.log(product)
  const [currentStep, setCurrentStep] = useState(1);


  const [formData, setFormData] = useState({
      boekingDatum: "",
      reden: "",
      extraItems: "",
      product: [],
      opmerking: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) { 
      setCurrentStep(currentStep - 1);
    } else {
      closeModal(); 
    }
  };
  const handleSubmit = () => {

    localStorage.setItem("formData", JSON.stringify(formData));
    closeModal();
    enqueueSnackbar("Product toegevoegd aan winkelmandje", {variant: "success"});
  };

  let stepContent;
  switch (currentStep) {
    case 1:
      stepContent = (
        <div className="flex flex-col gap-14 items-center relative h-full">

          <header className="flex justify-evenly w-full">
            <div className="w-20 border h-20 rounded-full bg-red-500 items-center justify-center flex">
              <p className="text-white text-lg">Datum</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Details</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Overzicht</p>
            </div>
          </header>

          <label className="text-3xl">Kies de periode:</label>
          <input type="date" />
          
          <div className="flex justify-between w-full absolute bottom-0">
            <button className="hover:underline flex justify-center items-center text-lg" onClick={handleBack}>
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button className="h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110" onClick={handleNext}>
              <p>Volgende</p>
              <MdNavigateNext className="text-lg"/>
            </button>
          </div>
        </div>
      );
      break;
    case 2:
      stepContent = (
        <div className="flex flex-col gap-10 items-center relative h-full ">

          <header className="flex justify-evenly w-full">
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Datum</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-red-500 items-center justify-center flex">
              <p className="text-white text-lg">Details</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Overzicht</p>
            </div>
          </header>



          <div className="flex flex-col items-start gap-8 w-1/2">
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Extra's</label>
              <select name="" id="" className="h-8 border border-gray-300 rounded-lg text-gray-500">
                <option value="">Selecteer</option>
                <option value="">Statief</option>
                <option value="">Kabel</option>
                <option value=""></option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Geef de reden van je reservatie</label>
              <select name="" id="" className="h-8 border rounded-lg text-gray-500 border-gray-300">
                <option value="">Selecteer</option>
                <option value="" className="text-black">Voor project</option>
                <option value="" className="text-black">Voor eigen gebruik </option>
                <option value="" className="text-black">Andere</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Opmerkingen</label>
              <textarea
                  type="text"
                  placeholder="Eventuele opmerkingen."
                  className="p-3 rounded-xl border border-gray-300 text-gray-500"
                  value={formData.productModelBeschrijving}
                  onChange
                />
                
              
            </div>
          </div>
          
          <div className="flex justify-between w-full absolute bottom-0">
            <button className="hover:underline flex justify-center items-center text-lg" onClick={handleBack}>
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button className="h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110" onClick={handleNext}>
              <p>Volgende</p>
              <MdNavigateNext className="text-lg"/>
            </button>
          </div>
        </div>
      );
      break;
    case 3:
      stepContent = (
        <div className="flex flex-col gap-10 items-center relative h-full">

          <header className="flex justify-evenly w-full">
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Datum</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-Grijs items-center justify-center flex">
              <p className="text-white text-lg">Details</p>
            </div>
            <div className="w-20 border h-20 rounded-full bg-red-500 items-center justify-center flex">
              <p className="text-white text-lg">Overzicht</p>
            </div>
          </header>

          <div className="flex flex-col items-start gap-8 w-1/2">
            <div className="flex flex-col w-full gap-1">
              <label className="text-xl font-semibold border-b border-black">Product</label>
              <div className="flex">
                <div>
                  <label>Naam:</label>
                  <input type="text" disabled="true" value={product.productNaam} id="" />
                </div>
                <div>
                  <label>Merk:</label>
                  <input type="text" disabled="true" value={product.productModelNr.productModelMerk} id="" />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-xl font-semibold border-b border-black">Datum</label>
              <div className="flex">
                <div>
                  <label>Afhaaldatum:</label>
                  <input type="text" disabled="true" value="2024-05-19" id="" />
                </div>
                <div>
                  <label>Terugbrengdatum:</label>
                  <input type="text" disabled="true" value="2024-05-24" id="" />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Opmerkingen</label>
              <textarea
                  type="text"
                  placeholder="Eventuele opmerkingen."
                  className="p-3 rounded-xl border border-gray-300 text-gray-500"
                  value={formData.productModelBeschrijving}
                  onChange
                />
                
              
            </div>
          </div>
          
          <div className="flex justify-between w-full absolute bottom-0">
            <button className="hover:underline flex justify-center items-center text-lg" onClick={handleBack}>
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button className="gap-2 h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110" onClick={handleSubmit}>
              <FaCheckCircle className="text-xl"/>
              <p>Bevestig</p> 
            </button>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg h-3/4 w-1/2">
        {stepContent}
      </div>
    </div>
  )
};

export default reserveringForm;
