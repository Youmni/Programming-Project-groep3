import React, { useContext, useEffect } from "react";
import { WinkelMandjeContext } from "../../contexts/winkelmandjeContext";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import BackupImage from "../../assets/backup.jpg";
import { RiDeleteBinFill } from "react-icons/ri";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";

const Winkelmandje = ({ closeWinkelMandje }) => {
  const { winkelmandje, removeFromWinkelmandje, clearWinkelmandje } =
    useContext(WinkelMandjeContext);


  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    const id = jwtDecode(authToken).sub;
    const groupedProducts = {};
    winkelmandje.forEach((product) => {
      const key = product.retourDatum;
      if (!groupedProducts[key]) {
        groupedProducts[key] = {
          afhaalDatum: product.afhaalDatum,
          retourDatum: product.retourDatum,
          boekingDatum: product.boekingDatum,
          reden: product.reden,
          opmerking: null,
          status: product.status,
          producten: [],
          gebruikerId: Number(id),
        };
      }
      groupedProducts[key].producten.push(product.product.productID);
    });

    const groupRequests = Object.values(groupedProducts).map(async (group) => {
      try {
        enqueueSnackbar("Reservatie wordt verwerkt, even geduld aub!", {
          variant: "info",
          });
        const response = await axios.post("http://localhost:8080/reservatie/toevoegen", group, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        enqueueSnackbar("Reservatie succesvol, check je mail voor verdere info!", {
          variant: "success",
        });
        clearWinkelmandje();
      } catch (error) {
        console.error("Error submitting group request:", error);
        enqueueSnackbar("Reservatie gefaald, probeer het opnieuw!"+ error.response.body, {
          variant: "error",
        });
      }
    });

    const individualRequests = winkelmandje
      .filter((product) => !groupedProducts[product.retourDatum])
      .map(async (product) => {
        try {
          enqueueSnackbar("Reservatie wordt verwerkt, even geduld aub!", {
            variant: "info",
            });
            
          const response = await axios.post(
            "http://localhost:8080/reservatie/toevoegen",
            {
              afhaalDatum: product.afhaalDatum,
              retourDatum: product.retourDatum,
              boekingDatum: product.boekingDatum,
              reden: product.reden,
              opmerking: null,
              status: product.status,
              producten: [product.product.productID],
              gebruikerId: Number(id),
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          enqueueSnackbar("Reservatie succesvol, check je mail voor verdere info!", {
            variant: "success",
          });
          clearWinkelmandje();
        } catch (error) {
          console.error("Error submitting individual request:", error);
          enqueueSnackbar("Reservatie gefaald, probeer het opnieuw!"+ error.response.body, {
            variant: "error",
          });
        }
      });
    await Promise.all([...groupRequests, ...individualRequests]);
  };

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      closeWinkelMandje();
    }
  };

  return (
    <main
      onClick={handleClickOutside}
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="bg-white p-10 rounded-lg w-full max-w-md h-[80%] relative shadow-md overflow-hidden">
        <h1 className="text-3xl font-semibold text-center">Winkelmandje</h1>
        {winkelmandje.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full relative">
            <p className="text-3xl mb-24">Je winkelmandje is momenteel leeg</p>
            <button
              onClick={closeWinkelMandje}
              className="absolute bottom-5 left-0 ml-4 px-4 place-items-center flex gap-2 justify-center h-auto w-auto p-3 rounded-xl bg-blue-200 text-black transform transition-transform duration-250 hover:scale-110 text-lg"
            >
              <BsArrowReturnLeft className="size-6" />
              <p className="hidden sm:block">Verder zoeken</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 h-[78%] overflow-auto mt-2">
            {winkelmandje.map((product) => (
              <figure
                key={product.productID}
                className="border-2 h-[200px] bg-white w-full rounded-2xl flex flex-col gap-2 p-5 relative shadow-lg"
              >
                <img
                  src={
                    product.product.productModelNr.productModelFoto
                      ? `/src/assets/ProductModelFotos/${product.product.productModelNr.productModelFoto}`
                      : BackupImage
                  }
                  alt=""
                  className="w-full h-16 object-contain"
                />
                <div className="flex flex-col flex-wrap">
                  <h1 className="text-2xl font-bold overflow-hidden">
                    {product.product.productNaam}
                  </h1>
                  <div className="flex flex-col flex-wrap w-full text-lg font-semibold">
                    <label>Periode</label>
                    <div className="flex text-sm">
                      <h2 className="">{product.afhaalDatum + " "} - </h2>
                      <h2 className="">{" " + product.retourDatum}</h2>
                    </div>
                  </div>
  
                  <button
                    className=" absolute right-3 top-2 text-red-500 justify-center  items-center flex transform transition-transform duration-250 hover:scale-110"
                    onClick={() =>
                      removeFromWinkelmandje(product.product.productID)
                    }
                  >
                    <RiDeleteBinFill size={25} />
                  </button>
                </div>
              </figure>
            ))}
          </div>
        )}
        {winkelmandje.length > 0 && (
          <div className="flex absolute bottom-0 justify-between items-center w-full left-0 p-6">
            <button
              onClick={closeWinkelMandje}
              className="flex gap-2 px-4 place-items-center justify-center h-auto w-auto p-3 rounded-xl bg-blue-200 text-black transform transition-transform duration-250 hover:scale-110 text-lg"
            >
              <BsArrowReturnLeft className="size-6" />
              <p className="hidden sm:block">Verder zoeken</p>
            </button>
            <button
              type="submit"
              className="gap-3 h-auto w-auto p-3 px-4 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110"
              onClick={onSubmit}
            >
              <FaCheckCircle className="size-6" />
              <p className="hidden sm:block">Reserveren</p>
            </button>
          </div>
        )}
      </div>
    </main>
  );
  
};

export default Winkelmandje;
