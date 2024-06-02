import React from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "./AuthToken";

const keuzePopup = ({ onClose }) => {
    const navigate = useNavigate();
    useAuth();

    const handleJa = () => {
      navigate('/admin/inventaris/product_toevoegen');
    };
  
    const handleNee = () => {
      navigate('/admin/inventaris/productModel_toevoegen');
    };
  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-lg min-h-[75%] w-1/2 relative shadow-md">

        <div className="flex justify-between mb-40">
            <h1 className="text-2xl">Bestaat het productmodel al?</h1>
            <button onClick={onClose} className="hover:underline">Terug</button>
        </div>
        <div className="flex justify-evenly">
          <button
            className="w-48 rounded-xl bg-Groen h-12 items-center justify-center flex gap-2 p-2 hover:bg-lime-400"
            onClick={handleJa}
          >
            Ja
          </button>
          <button
            className="w-48 rounded-xl bg-Groen h-12 items-center justify-center flex gap-2 p-2 hover:bg-lime-400"
            onClick={handleNee}
          >
            Nee
          </button>
        </div>
      </div>
    </main>
  );
};

export default keuzePopup;
