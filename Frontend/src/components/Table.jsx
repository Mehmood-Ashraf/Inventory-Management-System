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

import { Edit, Eye, FileText, Trash2 } from "lucide-react";
import React from "react";
import { Loader } from "../components/Loader";

function Table({
  title,
  subTitle,
  headers = [],
  data = [],
  showActions = false,
  onEdit,
  onDelete,
  onView,
  loading,
  Icon,
  type
}) {
  console.log(data);

  if (loading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return (
      // <div className="border border-[#cedbe8] bg-slate-50 rounded-lg p-4">
      //   <h2 className="text-lg font-semibold">{title}</h2>
      //   <p className="text-sm text-gray-500">{subTitle}</p>
      //   <p className="mt-4">No data found</p>
      // </div>
      <div className="text-center py-12 border border-[#cedbe8] bg-slate-50 rounded-lg">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {type === "bill" ? "bills" : "payments"} found
        </h3>
        <p className="text-gray-500">
          Get started by creating your first{" "}
          {type === "bill" ? "bill" : "payment"}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 rounded-xl border border-[#cedbe8] bg-slate-50">
      <div className="flex items-center mb-4">
        {Icon && <Icon className="h-10 w-10" />}
        <div>
          <h2 className="text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2">
            {title}
          </h2>
          <h2 className="text-sm text-gray-500 px-4 pb-3">{subTitle}</h2>
        </div>
      </div>
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
                <tr key={index} className="border-t border-t-[#cedbe8] hover:bg-gray-200 ">
                  {headers.map((header) => (
                    <td
                      key={header?.key}
                      className="h-[72px] px-4 py-2 w-[400px] text-[#49719c]  text-sm font-normal leading-normal capitalize"
                    >
                      {i[header?.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#49719c] text-sm font-normal leading-normal">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer"
                        onClick={() => onView(i._id)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer"
                        onClick={() => onEdit(i)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 cursor-pointer"
                        onClick={() => onDelete(i._id)}
                      >
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
    </div>
  );
}

export default React.memo(Table);
