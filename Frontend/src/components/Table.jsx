import { Edit, Eye, FileText, Trash2 } from "lucide-react";
import React from "react";
import { Loader } from "../components/Loader";
import Button from "./Button";

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
  type,
  loadMore,
}) {
  if (loading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 border border-[#cedbe8] bg-slate-50 rounded-lg">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No {type && type} found
        </h3>
        <p className="text-gray-500">
          Get started by creating your first {type && type}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 rounded-xl border border-[#cedbe8] bg-slate-50">
      {/* Heading */}
      <div className="flex items-center mb-4">
        {Icon && <Icon className="h-10 w-10" />}
        <div>
          <h2 className="text-[#0d141c] text-lg sm:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-2">
            {title}
          </h2>
          <h2 className="text-xs sm:text-sm text-gray-500 px-4 pb-3">
            {subTitle}
          </h2>
        </div>
      </div>

      {/* Table for desktop, cards for mobile */}
      <div className="px-2 sm:px-4 py-3">
        <div className="hidden sm:block overflow-hidden rounded-xl border border-[#cedbe8] bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                {headers?.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-3 text-sm font-medium text-[#0d141c]"
                  >
                    {header.label}
                  </th>
                ))}
                {showActions && (
                  <th className="px-4 py-3 text-sm font-medium text-[#0d141c]">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr
                  key={index}
                  className="border-t border-[#cedbe8] hover:bg-gray-100 transition"
                >
                  {headers.map((header) => (
                    <td
                      key={header?.key}
                      className="px-4 py-3 text-sm text-[#49719c] capitalize"
                    >
                      {header.render ? header.render(i) : i[header.key]}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => onView(i._id)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => onEdit(i)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => onDelete(i._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view (cards instead of table) */}
        <div className="sm:hidden space-y-3">
          {data?.map((i, index) => (
            <div
              key={index}
              className="border border-[#cedbe8] rounded-lg bg-white p-3 shadow-sm"
            >
              {headers.map((header) => (
                <div key={header?.key} className="flex justify-between py-1">
                  <span className="text-xs font-medium text-gray-500">
                    {header.label}
                  </span>
                  <span className="text-sm text-[#49719c]">
                    {header.render ? header.render(i) : i[header.key]}
                  </span>
                </div>
              ))}

              {showActions && (
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    onClick={() => onView(i._id)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    onClick={() => onEdit(i)}
                  >
                    <Edit className="h-4 w-4 cursor-pointer" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => onDelete(i._id)}
                  >
                    <Trash2 className="h-4 w-4 cursor-pointer" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {loadMore && (
          <div className="flex justify-center mt-6">
            <Button
              variant="secondary"
              size="sm"
              className="!py-1 px-4 rounded-lg shadow-sm hover:shadow-md transition"
              onClick={loadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Table);
