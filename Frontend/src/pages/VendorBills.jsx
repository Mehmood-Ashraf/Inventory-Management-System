import { Edit, Eye, FileText, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import useVendors from "../hooks/useVendors";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleVendor } from "../redux/slice/vendorSlice";
import VendorBillDetailsModal from "../components/vendors/VendorBillDetailsModal";

const VendorBills = () => {
  const [searchInput, setSearchInput] = useState("");
  const singleVendor = useSelector((state) => state.vendor.singleVendor);
  const vendorBills = singleVendor?.vendorBills;
  const dispatch = useDispatch();
  const { handleViewBillDetails, showBillDetailsModal, selectedBill, setShowBillDetailsModal } = useVendors();

  useEffect(() => {
    const savedID = localStorage.getItem("VendorID");
    if (savedID) {
      dispatch(fetchSingleVendor(savedID));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search bills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <select
              // value={filterStatus}
              // onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Bills</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Bill
          </Button>
        </div>
        {/* Bills Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendorBills?.map((bill) => (
                  <tr
                    key={bill._id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {bill.billNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bill.vendorName}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          bill.customerType === "regular"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {singleVendor?.customerType?.charAt(0).toUpperCase() +
                          bill?.customerType?.slice(1)}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {bill.totalAmount}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={bill.status}
                        onChange={(e) =>
                          handleStatusChange(bill.id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-offset-2 ${
                          bill.status === "paid"
                            ? "bg-green-100 text-green-800 focus:ring-green-500"
                            : bill.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 focus:ring-yellow-500"
                            : "bg-red-100 text-red-800 focus:ring-red-500"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(bill.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewBillDetails(bill);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => handleEdit(bill)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => onDeleteBill(bill.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>


        {vendorBills?.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bills found
            </h3>
            <p className="text-gray-500">
              {searchInput
                ? "Try adjusting your search criteria"
                : "Get started by creating your first bill"}
            </p>
          </div>
        )}


        {/* Add/Edit Bill Modal */}
        

        {/* View Bill Modal */}
        {showBillDetailsModal && (
          <Modal
            onClose={() => setShowBillDetailsModal(false)}
            title={`Bill Details - ${selectedBill?.billNumber || "Not Available"}`}
          >
            {selectedBill && (
              <VendorBillDetailsModal selectedBill={selectedBill}/>
            )}
          </Modal>
        )}
        ;
      </div>
    </div>
  );
};

export default VendorBills;
