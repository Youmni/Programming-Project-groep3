import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbClockExclamation } from "react-icons/tb";
import { FaArrowsSpin } from "react-icons/fa6";
import { FaCheckCircle, FaRegCalendarAlt } from "react-icons/fa";

const figuresData = [
  {
    Icon: TbClockExclamation,
    color: "text-red-600",
    bg: "bg-red-200",
    title: "Te laat",
    count: 6,
  },
  {
    Icon: FaArrowsSpin,
    color: "text-amber-600",
    bg: "bg-amber-100",
    title: "Lopend",
    count: 6,
  },
  {
    Icon: FaCheckCircle,
    color: "text-green-700",
    bg: "bg-green-100",
    title: "In orde",
    count: 6,
  },
  {
    Icon: FaRegCalendarAlt,
    color: "text-blue-700",
    bg: "bg-blue-100",
    title: "Voorboeking",
    count: 6,
  },
];

const Figure = ({ Icon, color, bg, title, count }) => (
  <button
    onClick={() => {
      /*code for the click*/
    }}
  >
    <figure
      className={`flex h-full w-[120px] border rounded-lg items-start border-gray-300 ${bg} flex-col justify-center gap-4 transform transition-transform duration-250 hover:scale-110`}
    >
      <Icon className={`size-16 ml-4 ${color}`} />
      <h1 className="flex flex-col -space-y-7 ml-4">
        <span className="text-base text-Grijs font-nm text-">{title}</span>
        <br />
        <span className="text-2xl text-black font-semibold">{count}</span>
      </h1>
    </figure>
  </button>
);

const UserLeningen = () => {
  return (
    <main className="flex flex-col p-12 w-full flex-wrap gap-20">
      <h1 className="flex h-auto text-4xl font-medium">
        <span className="border-b">Leningen</span>
      </h1>

      <div className="flex w-1/2 flex-col gap-1">
        <h2 className="flex text-xl font-semibold">Overzicht</h2>
        <div className="flex gap-8 h-44 mt-6">
          {figuresData.map((figure, index) => (
            <Figure key={index} {...figure} />
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="flex text-xl font-semibold">
          <div className="flex items-center">
            Actieve Leningen
            <IoMdArrowDropdown className="size-4 text-Grijs" />
          </div>
        </h2>
        <table className="w-full h-full">
          <thead className="w-full items-center h-16">
            <tr className="text-sm text-Lichtgrijs font-thin">
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center justify-center">
                  Nr
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center ">
                  Product
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                Aantal
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">Extra's</div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Uitgeleend op
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Uitgeleend tot
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Status
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                Actie
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex flex-col">
        <h2 className="flex text-xl font-semibold">
          <div className="flex items-center ">
            Oude Leningen
            <IoMdArrowDropdown className="size-4 text-Grijs" />
          </div>
        </h2>
        <table className="w-full h-full">
          <thead className="w-full items-center h-16">
            <tr className="text-sm text-Lichtgrijs font-thin">
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center justify-center">
                  Nr
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center ">
                  Product
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                Aantal
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">Extra's</div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Uitgeleend op
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Uitgeleend tot
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-2 w-1/8 min-w-20 max-w-32"
              >
                <div className="flex items-center">
                  Status
                  <IoMdArrowDropdown className="size-4 text-Grijs" />
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
};

export default UserLeningen;

// in geval dat we het nodig hebben -->

// npm install react-super-responsive-table react-responsive

// import { useMediaQuery } from 'react-responsive'
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

// // ...

// const UserLeningen = () => {
//   const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

//   return (
//     <main className="flex flex-col w-full flex-wrap gap-20 mt-10 ml-8">
//       {/* ... */}
//       <div className="flex flex-col">
//         <h2 className="flex text-xl font-semibold">
//           <div className="flex items-center">
//             Actieve Leningen
//             <IoMdArrowDropdown className="size-4 text-Grijs" />
//           </div>
//         </h2>
//         <Table className="w-full h-full">
//           <Thead>
//             <Tr>
//               {/* ... */}
//               <Th className="text-left px-2 w-1/8 min-w-20 max-w-32">
//                 <div className="flex items-center justify-center">
//                   Nr
//                   <IoMdArrowDropdown className="size-4 text-Grijs" />
//                 </div>
//               </Th>
//               {/* ... */}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {/* ... */}
//           </Tbody>
//         </Table>
//       </div>
//     </main>
//   )
// }
