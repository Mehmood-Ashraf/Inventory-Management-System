// import React from 'react'

// const Table = () => {
// return (
//     <div>
//         <table className='table-auto border-collapse border border-gray-400 w-full'>
//             <thead>
//                 <tr>
//                     <th className='border border-gray-400 px-4 py-2'>Date</th>
//                     <th className='border border-gray-400 px-4 py-2'>Name</th>
//                     <th className='border border-gray-400 px-4 py-2'>Type</th>
//                     <th className='border border-gray-400 px-4 py-2'>Amount</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td className='border border-gray-400 px-4 py-2'>22/8/24</td>
//                     <td>Mehmood</td>
//                     <td>Sale</td>
//                     <td>9000</td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
// )
// }

// export default Table

import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import {Loader} from '../components/Loader'



function Table({ title, subTitle, headers = [], data = [], showActions = false, onEdit, onDelete, onView, loading }) {
  console.log(data)
  // const title1 = "Recent Transictions";
  const listHeaders = [
    { key : "type", label : "Type"},
    { key : "date", label : "Date"},
    { key : "detail", label : "Detail"},
    { key : "amount", label : "Amount"}
  ];
  const dummyData = [
    {
      type: " New Order Received",
      date: "2023-08-15",
      detail: "Order #12345 from Emily Carter",
      amount: 5000,
    },
    {
      type: " Product Added",
      date: "2023-08-14",
      detail: "Added Product X to inventory",
      amount: 6000,
    },

    {
      type: "Customer Registered",
      date: "2023-08-12",
      detail: "New customer, Ethan Chen, registered",
      amount: 1000,
    },

    {
      type: " New Order Received",
      date: "2023-08-15",
      detail: "Order #12345 from Emily Carter",
      amount: 2500,
    },
    {
      type: " Product Added",
      date: "2023-08-14",
      detail: "Added Product X to inventory",
      amount: 1500,
    },

    {
      type: "Customer Registered",
      date: "2023-08-12",
      detail: "New customer, Ethan Chen, registered",
      amount: 200,
    },
  ];

  if (!data || data.length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subTitle}</p>
        <p className="mt-4">No data found</p>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-5">
        {title}
      </h2>
      <h2 className="text-sm text-gray-500 px-4 pb-3">
        {subTitle}
      </h2>
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-xl border border-[#cedbe8] bg-slate-50">
          <table className="flex-1">
            <thead>
              <tr className="bg-slate-50">
                {headers?.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal"
                  >
                    {header.label}
                  </th>
                ))}
                {showActions && (
                  <th className="px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index} className="border-t border-t-[#cedbe8]">
                {headers.map((header) => (
                  <td key={header?.key} className="h-[72px] px-4 py-2 w-[400px] text-[#49719c]  text-sm font-normal leading-normal">
                    {i[header?.key]}
                  </td>
                )
              )}
                  {showActions && (
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#49719c] text-sm font-normal leading-normal">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer" onClick={() => onView(i._id)}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer" onClick={() => onEdit(i)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 cursor-pointer" onClick={() => onDelete(i._id)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
