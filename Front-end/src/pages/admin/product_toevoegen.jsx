import React, { useState, useEffect } from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const ProductToevoegen = () => {
  const navigate = useNavigate();
  const [productModellen, setProductModellen] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    productModelNr: "",
    productNaam: "",
    status: "Beschikbaar",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      enqueueSnackbar("Uw sessie is verlopen. Log opnieuw in.", {
        variant: "error",
      });
      navigate("/login");
      return;
    }
    // fetch Categories
    axios
      .get("http://localhost:8080/productmodel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductModellen(response.data);
        enqueueSnackbar("Product Modellen opgehaald", { variant: "success" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        enqueueSnackbar("Error: ProductModellen niet opgehaald", {
          variant: "error",
        });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    const updatedFormData = ({
      ...formData,
      productModelNr: selected.productModelNr,
      productNaam: selected.productModelNaam,
    });
    axios
    .post("http://localhost:8080/product/toevoegen", updatedFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      enqueueSnackbar("Product toegevoegd", { variant: "success" });
      console.log("Product Toegevoegd",response.data);
      navigate("/admin/inventaris");
    })
    .catch(error => {
      console.error("Error adding product: ", error);
      enqueueSnackbar("Error: Product niet toegevoegd, probeer het opnieuw", { variant: "error" });
    })
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProductModellen = productModellen.filter(
    (model) =>
      model.productModelNaam
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      model.productModelMerk
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(model.productModelNr)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <content className="top-0 flex-grow">
      <main className="flex-grow p-10 ">
        <div className="flex justify-between items-center">
          <h1 className=" flex text-3xl font-bold w-40 border-b justify-center">
            Inventaris
          </h1>
          <div className="flex items-center gap-10">
            <Link
              to="/admin/inventaris"
              className="hover:text-red-400 underline"
            >
              Annuleren
            </Link>
            <button
              onClick={handleSubmit}
              className="w-40 rounded-xl bg-Groen h-12 items-center justify-center flex gap-3 p-2 hover:bg-lime-300"
            >
              <MdOutlineAddCircle className="flex size-7" />
              <h2 className="font-semibold text-lg">Toevoegen</h2>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-10 ml-5  justify-between">
          <breadcrumb className="flex items-center gap-2">
            <RxDashboard className="text-rood" />
            <Link
              to={`/admin/inventaris`}
              className="hover:text-red-400 underline"
            >
              <breadcrumb-item>Inventaris </breadcrumb-item>
            </Link>
            <breadcrumb-item>/ Product toevoegen</breadcrumb-item>
          </breadcrumb>
        </div>
        <div className="flex flex-grow h-full mt-5 ml-8">
          <form className="flex w-full h-full gap-20">
            <div className="flex flex-col w-1/2 border rounded-lg  p-5">
              <div
                onClick={() => setOpen(!open)}
                className="bg-white w-[70%] p-4 flex border text-xl place-items-center justify-between rounded-xl"
              >
                {selected ? (
                  <div>
                    <p>{selected.productModelNaam}</p>
                    <p>{selected.productModelMerk}</p>
                  </div>
                ) : (
                  "Selecteer een product"
                )}
                <BiChevronDown size={20} />
              </div>
              <div
                className={`flex flex-col w-[70%] overflow-y-auto ${
                  open ? "max-h-[600px]" : "max-h-0"
                } `}
              >
                <div className="flex bg-white items-center px-2 py-2 sticky top-0">
                  <AiOutlineSearch size={20} />
                  <input
                    type="text"
                    placeholder="Zoek naar product..."
                    className="placeholder:text-black p-2 outline-none w-full text-xl "
                    onChange={handleSearch}
                    value={searchQuery}
                  />
                </div>
                <ul>
                  {filteredProductModellen.map((model) => (
                    <li
                      key={model.productModelNr}
                      className={`p-4 text-lg hover:bg-sky-600 hover:text-white cursor-pointer ${
                        model === selected && "bg-sky-600 text-white"
                      }`}
                      onClick={() => {
                        setSelected(model);
                        setOpen(false);
                      }}
                    >
                      <p>{model.productModelNaam}</p>
                      <p>{model.productModelMerk}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    </content>
  );
};

export default ProductToevoegen;
