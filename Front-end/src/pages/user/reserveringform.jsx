import React from "react";
import { useState, useContext, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
import { WinkelMandjeContext } from "../../contexts/winkelmandjeContext";
import { jwtDecode } from "jwt-decode";

import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const reserveringForm = ({ closeModal, product }) => {
  const { addToWinkelmandje } = useContext(WinkelMandjeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [excludeDates, setExcludeDates] = useState(null);
  const [correctDates, setCorrectDates] = useState(false);

  const formatDate = (date) => {
    let dag = date.getDate();
    let maand = date.getMonth() + 1;
    let jaar = date.getFullYear();

    dag = dag < 10 ? "0" + dag : dag;
    maand = maand < 10 ? "0" + maand : maand;

    return `${jaar}-${maand}-${dag}`;
  };

  const [formData, setFormData] = useState({
    gebruikerId: null,
    afhaalDatum: null,
    retourDatum: null,
    boekingDatum: formatDate(new Date()),
    reden: null,
    opmerking: null,
    status: "Voorboeking",
    producten: [product.productID],
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
        variant: "error",
      });
      navigate("/login");
      return;
    } else {
      setFormData({ ...formData, gebruikerId: jwtDecode(authToken).UserId });
    }
  }, []);

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
      ...formData, product: product
    };
    console.log(productData)
    addToWinkelmandje(productData);
    closeModal();
    enqueueSnackbar("Product toegevoegd aan winkelmandje", {
      variant: "success",
    });
  };

  const checkReden = (reden) => {
    if (reden === null) {
      enqueueSnackbar("Gelieve een reden te selecteren", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Reden succesvol geselecteerd", {
        variant: "success",
      });
      formatDates();
      handleNext();
    }
  };

  const formatDates = () => {
    let geformatteerdeStartDatum, geformatteerdeEindDatum;

    if (formData.afhaalDatum) {
      let startDag = new Date(formData.afhaalDatum);
      let jaar = startDag.getFullYear();
      let maand = startDag.getMonth() + 1;
      let dag = startDag.getDate();

      dag = dag < 10 ? "0" + dag : dag;
      maand = maand < 10 ? "0" + maand : maand;

      geformatteerdeStartDatum = `${jaar}-${maand}-${dag}`;
    }

    if (formData.retourDatum) {
      let eindDag = new Date(formData.retourDatum);
      let jaar = eindDag.getFullYear();
      let maand = eindDag.getMonth() + 1;
      let dag = eindDag.getDate();

      dag = dag < 10 ? "0" + dag : dag;
      maand = maand < 10 ? "0" + maand : maand;

      geformatteerdeEindDatum = `${jaar}-${maand}-${dag}`;
    }

    setFormData({
      ...formData,
      afhaalDatum: geformatteerdeStartDatum,
      retourDatum: geformatteerdeEindDatum,
    });
  };

  const checkDates = (afhaaldatum, retourdatum) => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
          variant: "error",
        });
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(authToken);

      const afhaalDate = new Date(afhaaldatum);
      const retourDate = new Date(retourdatum);

      const verschilInTijd = retourDate - afhaalDate;
      const verschilInDagen = verschilInTijd / (1000 * 60 * 60 * 24);

      // Als de gebruiker een student is en de datums meer dan 5 dagen uit elkaar liggen, geef dan een foutmelding.

      const eenWeekInMiliSeconden = 7 * 24 * 60 * 60 * 1000;

      if (afhaaldatum.getTime() > retourdatum.getTime() ||  afhaaldatum.getTime() < Date.now()) {
        setCorrectDates(false);
        enqueueSnackbar("De startdatum mag niet later zijn dan de einddatum! En ook niet in het verleden", {
          variant: "error",
        });
      } else if (
        decodedToken.Titel.toLowerCase() === "student" &&
        verschilInDagen > 5 ||
        afhaaldatum.getTime() > Date.now() + eenWeekInMiliSeconden) {
        setCorrectDates(false);
        enqueueSnackbar(
          "De limiet voor een student is van maandag tot vrijdag! En maar 1 week vooruit!",
          {
            variant: "error",
          }
        );
      } else {
        setCorrectDates(true);
        enqueueSnackbar("Datums succesvol geselecteerd", {
          variant: "success",
        });

        handleNext();
      }
    } catch (err) {
      console.error("Er is een fout opgetreden:", err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(
      `http://localhost:8080/reservatie/niet-beschikbare-datums/${product.productID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedDates = data.map((date) => new Date(date));
        setExcludeDates(formattedDates);
        console.log("Dates fetched:", formattedDates);
      })
      .catch((error) => console.error("Error fetching dates:", error));
  }, []);

  // deze functie is voorlopig niet nodig. Later indien dat er op andere dagen mag gereserveerd worden wel.
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

  const isMonday = (date) => {
    const day = date.getDay();
    return day === 1;
  };

  const isFriday = (date) => {
    const day = date.getDay();
    return day === 5;
  };

  const handleNuReserveren = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(formData.gebruikerId);
      console.log("formData:", formData);
      if (!authToken) {
        enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
          variant: "error",
        });
        navigate("/login");
        return;
      }

      console.log("Sending formData:", formData);

      const response = await axios.post(
        `http://localhost:8080/reservatie/toevoegen`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      enqueueSnackbar("Actie succesvol uitgevoerd!", {
        variant: "success",
      });

      closeModal();
    } catch (error) {
      enqueueSnackbar("Er is een fout opgetreden bij het reserveren" + error, {
        variant: "error",
      });
    }
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
              selected={formData.afhaalDatum}
              onChange={(date) =>
                setFormData({ ...formData, afhaalDatum: date })
              }
              minDate={new Date()}
              filterDate={isMonday}
              excludeDates={excludeDates}
              placeholderText="Kies een datum"
              dateFormat="dd/MM/yyyy"
            />
            <h2>Selecteer een einddatum:</h2>
            <DatePicker
              selected={formData.retourDatum}
              onChange={(date) =>
                setFormData({ ...formData, retourDatum: date })
              }
              minDate={new Date()}
              filterDate={isFriday}
              excludeDates={excludeDates}
              placeholderText="Kies een datum"
              dateFormat="dd/MM/yyyy"
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
              onClick={() =>
                checkDates(formData.afhaalDatum, formData.retourDatum)
              }
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
              onClick={() => checkReden(formData.reden)}
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
                  <label>Afhaal datum:</label>
                  <input
                    type="text"
                    disabled="true"
                    value={formData.afhaalDatum}
                  />
                </div>
                <div>
                  <label>Terugbreng datum:</label>
                  <input
                    type="text"
                    disabled="true"
                    value={formData.retourDatum}
                  />
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
              <p>In winkelmandje</p>
            </button>
            <button
              type="submit"
              className="gap-2 h-auto w-auto p-3 bg-Groen rounded-xl  text-black flex justify-center items-center text-lg transform transition-transform duration-250 hover:scale-110"
              onClick={handleNuReserveren}
            >
              <FaCheckCircle className="text-xl" />
              <p>Nu reservereren</p>
            </button>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg h-3/4 w-1/2 ">{stepContent}</div>
    </div>
  );
};

export default reserveringForm;