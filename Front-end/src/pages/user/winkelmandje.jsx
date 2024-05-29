import React, { useContext, useEffect } from 'react';
import { WinkelMandjeContext } from '../../contexts/winkelmandjeContext';
import canonFoto from "../../assets/canon-eos-200d.jpg";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import BackupImage from "../../assets/backup.jpg";

const winkelmandje = ({ closeWinkelMandje }) => {
  const { winkelmandje, removeFromWinkelmandje, clearWinkelmandje } = useContext(WinkelMandjeContext);
  useEffect(() => {
    
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50'>
      <div className='bg-white p-10 rounded-lg h-[75%] w-1/2 relative shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>Winkelmandje</h1>
        {winkelmandje.length === 0 ? (
          <div className="flex justify-center items-center h-full relative">
            <p className="text-3xl mb-24">Je winkelmandje is momenteel leeg</p>
            <button onClick={closeWinkelMandje} className='absolute bottom-5 left-0 ml-4 px-4 place-items-center flex gap-2 justify-center h-auto w-auto p-3 rounded-xl bg-blue-200 text-black transform transition-transform duration-250 hover:scale-110 text-lg'>
              <BsArrowReturnLeft className='size-6' />
              <p>Verder zoeken</p>
            </button>
          </div>
        ) : (
          <div className='flex flex-wrap justify-evenly max-h-full overflow-auto'>
            {winkelmandje.map((product) => (
              <figure key={product.productID} className='border max-h-[270px] overflow-auto bg-white w-1/2 rounded-2xl flex flex-col gap-2 p-5 relative shadow-lg'>
                <img src={product.product.productModelNr.productModelFoto ? `/src/assets/ProductModelFotos/${product.product.productModelNr.productModelFoto}` : BackupImage} alt="" className='w-full h-16 object-contain' />
                <div className='flex flex-col flex-wrap'>
                  <h1 className='text-2xl font-bold overflow-hidden'>{product.product.productNaam}</h1>
                  <div className='flex flex-col flex-wrap w-full text-lg font-semibold'>
                    <label >Periode</label>
                    <div className='flex text-sm'>
                      <h2 className=''>{product.afhaalDatum + " "} -  </h2>
                      <h2 className=''>{" " + product.retourDatum}</h2>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center w-1/2 gap-3 text-white text-lg font-light'>
                  <button className='h-14 w-auto border rounded-3xl bg-red-400 justify-center  items-center flex p-2 hover:bg-red-800' onClick={() => removeFromWinkelmandje(product.product.productID)}>
                    <p>Verwijderen</p>
                  </button>
                  <button className='h-14 border w-auto rounded-3xl bg-gray-800 justify-center  items-center flex p-2 shadow-lg hover:bg-black'>
                    <p>Wijzigen</p>
                  </button>
                </div>
              </figure>
            ))}
          </div>
        )}
        {winkelmandje.length > 0 && (
          <div className='flex absolute bottom-0 justify-between items-center w-full left-0 p-6'>
            <button onClick={closeWinkelMandje} className='flex gap-2 px-4 place-items-center justify-center h-auto w-auto p-3 rounded-xl bg-blue-200 text-black transform transition-transform duration-250 hover:scale-110 text-lg'>
              <BsArrowReturnLeft className='size-6' />
              <p>Verder zoeken</p>
            </button>
            <button type="submit" className="gap-3 h-auto w-auto p-3 px-4 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110" >
              <FaCheckCircle className="size-6" />
              <p>Bevestigen</p>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default winkelmandje;
