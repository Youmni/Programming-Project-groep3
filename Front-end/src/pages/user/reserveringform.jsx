import React from "react";
import { useState } from "react";


const reserveringForm = ({closeModal}) => {
  const [boekingDatum, setBoekingDatum] = useState("");
  const [reden, setReden] = useState("");
  const [opmerking, setOpmerking] = useState("");
  const [currentStep, setCurrentStep] = useState(1);


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
  const handleSubmit = () => {};

  let stepContent;
  switch (currentStep) {
    case 1:
      stepContent = (
        <div className="flex flex-col gap-5 items-center">
          <label className="text-2xl">Kies de periode:</label>
          <input type="date" />
          
          <div className="flex justify-between w-full">
            <button className="hover:underline" onClick={handleBack}>Terug</button>
            <button className="h-12 w-24 bg-green-500 rounded-lg text-white text-xl" onClick={handleNext}>Volgende</button>
          </div>
        </div>
      );
      break;
    case 2:
      stepContent = (
        <div>
          <input
            type="text"
            placeholder="Reden"
            value={reden}
            onChange={(e) => setReden(e.target.value)}
          />
          <button onClick={handleBack}>Terug</button>

          <button onClick={handleNext}>Volgende</button>
        </div>
      );
      break;
    case 3:
      stepContent = (
        <div>
          <input
            type="text"
            placeholder="Opmerking"
            value={opmerking}
            onChange={(e) => setOpmerking(e.target.value)}
          />
          <button onClick={handleBack}>Terug</button>
          <button onClick={handleSubmit}>Reserveren</button>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg h-3/4 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">
          Stap : {currentStep}
        </h2>
        {stepContent}
      </div>
    </div>
  )
};

export default reserveringForm;
