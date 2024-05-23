import React from "react";
import { useState, useContext, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { WinkelMandjeContext } from "../../contexts/winkelmandjeContext";
import {jwtDecode} from 'jwt-decode'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const reserveringForm = ({ closeModal, product, productNr }) => {
  const { addToWinkelmandje } = useContext(WinkelMandjeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [excludeDates, setExcludeDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [correctDates, setCorrectDates] = useState(false);

  const [formData, setFormData] = useState({
    boekingDatum: "",
    reden: "",
    extraItems: "",
    product: product,
    opmerking: "",
  });

  const authToken = localStorage.getItem('authToken');
  const decodedToken = jwtDecode(authToken);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
    };
    addToWinkelmandje(productData);
    closeModal();
    enqueueSnackbar("Product toegevoegd aan winkelmandje", {
      variant: "success",
    });
  };

  const checkDates = (afhaaldatum, retourdatum) => {
    try {
      const afhaalDate = new Date(afhaaldatum);
      const retourDate = new Date(retourdatum);
  
      const verschilInTijd = retourDate - afhaalDate;
      const verschilInDagen = verschilInTijd / (1000 * 60 * 60 * 24);
  
      if (decodedToken.Titel === "Student" && verschilInDagen > 5) {
        setCorrectDates(false);
        enqueueSnackbar("Datums zijn te ver uiteen. De limiet voor een student is van maandag tot vrijdag!", {
          variant: "error",
        });
      } else {
        setCorrectDates(true);
        enqueueSnackbar("Datums succesvol geselecteerd", {
          variant: "success",
        });
        handleNext();
      }
    } catch (err) {
      console.error('Er is een fout opgetreden:', err.message);
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:8080/reservatie/beschikbare-datums/${productNr}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedDates = data.map((date) => new Date(date));
        setExcludeDates(formattedDates);
      })
      .catch((error) => console.error("Error fetching dates:", error));
  }, []);

  const isWeekday = (date) => {
    const day = date.getDay();

    if (day === 0 || day === 6) {
      return false;
    }

    if (day === 2 || day === 3 || day === 4) {
      return false;
    }
    return true;
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
          <div>
            <h2>Selecteer een begindatum:</h2>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={isWeekday}
              excludeDates={null}
              placeholderText="Kies een datum"
            />
            <h2>Selecteer een einddatum:</h2>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              filterDate={isWeekday}
              excludeDates={null}
              placeholderText="Kies een datum"
              startDate={startDate}
              startDateClassName="bg-blue-200"
            />
          </div>

          <div className="flex justify-between w-full absolute bottom-0">
            <button
              className="hover:underline flex justify-center items-center text-lg"
              onClick={handleBack}
            >
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button
              className="h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110"
              onClick={() => checkDates(startDate, endDate)}
            >
              <p>Volgende</p>
              <MdNavigateNext className="text-lg" />
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
              <select
                name="extraItems"
                value={formData.extraItems}
                onChange={handleChange}
                className="h-8 border border-gray-300 rounded-lg text-gray-500"
              >
                <option value="">Selecteer</option>
                <option value="Statief">Statief</option>
                <option value="Kabel">Kabel</option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Geef de reden van je reservatie</label>
              <select
                name="reden"
                value={formData.reden}
                onChange={handleChange}
                className="h-8 border rounded-lg text-gray-500 border-gray-300"
              >
                <option value="">Selecteer</option>
                <option value="Voor project" className="text-black">
                  Voor project
                </option>
                <option value="Voor eigen gebruik" className="text-black">
                  Voor eigen gebruik{" "}
                </option>
                <option value="Andere" className="text-black">
                  Andere
                </option>
              </select>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-lg">Opmerkingen</label>
              <textarea
                type="text"
                placeholder="Eventuele opmerkingen."
                className="p-3 rounded-xl border border-gray-300 text-gray-500"
                value={formData.opmerking}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between w-full absolute bottom-0">
            <button
              className="hover:underline flex justify-center items-center text-lg"
              onClick={handleBack}
            >
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button
              className="h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110"
              onClick={handleNext}
            >
              <p>Volgende</p>
              <MdNavigateNext className="text-lg" />
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
              <label className="text-xl font-semibold border-b border-black">
                Product
              </label>
              <div className="flex">
                <div>
                  <label>Naam:</label>
                  <input
                    type="text"
                    disabled="true"
                    value={product.productNaam}
                    id=""
                  />
                </div>
                <div>
                  <label>Merk:</label>
                  <input
                    type="text"
                    disabled="true"
                    value={product.productModelNr.productModelMerk}
                    id=""
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label className="text-xl font-semibold border-b border-black">
                Datum
              </label>
              <div className="flex">
                <div>
                  <label>BoekingDatum:</label>
                  <input
                    type="text"
                    disabled="true"
                    value={formData.boekingDatum}
                  />
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
                value={formData.opmerking}
                disabled="true"
              />
            </div>
          </div>

          <div className="flex justify-between w-full absolute bottom-0">
            <button
              className="hover:underline flex justify-center items-center text-lg"
              onClick={handleBack}
            >
              <IoIosArrowBack className="text-xl" />
              <p>Terug</p>
            </button>
            <button
              type="submit"
              className="gap-2 h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110"
              onClick={handleSubmit}
            >
              <FaCheckCircle className="text-xl" />
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
      <div className="bg-white p-8 rounded-lg h-3/4 w-1/2">{stepContent}</div>
    </div>
  );
};

export default reserveringForm;
