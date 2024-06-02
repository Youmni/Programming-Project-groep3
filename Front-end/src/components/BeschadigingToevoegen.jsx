import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddCircle } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuth } from "./AuthToken";

const BeschadigingToevoegen = ({ onClose, product }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [gebruikers, setGebruikers] = useState([]);
  const [formData, setFormData] = useState({
    gebruikerID: "",
    productID: "",
    beschrijving: "",
    beschadigingdDatum: "",
  });

  useAuth();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8080/gebruiker", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGebruikers(response.data);
        console.log("Gebruikers succesvol opgehaald", response.data);
      })
      .catch((error) => {
        console.error(
          "Er is iets fout gegaan bij het ophalen van de gebruikers",
          error
        );
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    const beschadigingdDatum = new Date().toLocaleDateString('nl-NL');
    const updatedFormData = {
      gebruikerID: selected.gebruikerID,
      productID: product.productID,
      beschrijving: formData.beschrijving,
      beschadigingdDatum: beschadigingdDatum,
    };
    console.log(updatedFormData);
    try {
      const response = await axios.post(
        "http://localhost:8080/beschadiging/toevoegen",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Beschadiging toegevoegd", { variant: "success" });
      console.log("Categorie succesvol toegevoegd", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding beschadiging: ", error);
      enqueueSnackbar(
        "Error: Beschadiging niet toegevoegd, probeer het opnieuw",
        { variant: "error" }
      );
      setFormData({
        categorieNaam: "",
      });
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGebruikers = gebruikers.filter(
    (gebruiker) =>
      gebruiker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(gebruiker.gebruikerID)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const formatName = (email) => {
    const localPart = email.split("@")[0];
    const nameParts = localPart.split(".");
    const formattedName = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return formattedName;
  };

  return (
    <main className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg min-h-[80%] w-1/2 relative shadow-md">
        <section className="w-full h-full rounded-lg">
          <form onSubmit={onSubmit} className="flex w-full h-full gap-20">
            <div className="flex flex-col gap-10 w-full rounded-lg p-5">
              <h1 className="text-3xl font-medium">Beschadiging Toevoegen</h1>
              <div className="flex flex-col  w-full rounded-lg gap-5 ">
                <label className="text-lg">Selecteer Gebruiker</label>
                <div
                  onClick={() => setOpen(!open)}
                  className="bg-red-100 w-3/4 p-4 flex border relative text-lg place-items-center justify-between rounded-xl"
                >
                  {selected ? (
                    <div>
                      <p>{formatName(selected.email)}</p>
                    </div>
                  ) : (
                    "Selecteer een gebruiker"
                  )}
                  <BiChevronDown size={20} />
                </div>
                <div
                  className={`bg-white flex flex-col w-3/4 overflow-y-auto absolute top-[32%] ${
                    open ? "max-h-[400px]" : "max-h-0"
                  } `}
                >
                  <div className="flex bg-white items-center px-2 py-2 sticky top-0">
                    <AiOutlineSearch size={20} />
                    <input
                      type="text"
                      placeholder="Zoek naar gebruiker..."
                      className="placeholder:text-black p-2 outline-none w-full text-lg overflow-hidden "
                      onChange={handleSearch}
                      value={searchQuery}
                    />
                  </div>
                  <ul>
                    {filteredGebruikers.map((gebruiker) => (
                      <li
                        key={`${gebruiker.gebruikerID}-${gebruiker.email}`}
                        className={`p-4 text-lg hover:bg-sky-600 hover:text-white cursor-pointer ${
                          gebruiker === selected && "bg-sky-600 text-white"
                        }`}
                        onClick={() => {
                          setSelected(gebruiker);
                          setOpen(false);
                        }}
                      >
                        <p>{formatName(gebruiker.email)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-3/4">
                <label>Geef een beschrijving van de beschadiging</label>
                <textarea
                  type="text"
                  name="beschrijving"
                  placeholder="Geef een beschrijving"
                  className="p-2 rounded-xl bg-red-100"
                  required
                  value={formData.beschrijving}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center absolute bottom-0 left-0 justify-between w-full p-5 gap-10">
                <button
                  onClick={onClose}
                  className="hover:text-red-400 underline"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="w-40 rounded-xl bg-Groen h-12 items-center justify-center flex gap-3 p-2 hover:bg-lime-300"
                >
                  <MdOutlineAddCircle className="flex size-7" />
                  <h2 className="font-semibold text-lg">Toevoegen</h2>
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default BeschadigingToevoegen;
