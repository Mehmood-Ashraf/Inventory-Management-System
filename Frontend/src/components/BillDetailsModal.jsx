import React from 'react'

const BillDetailsModal = ({ selectedBill, type }) => {

    const nameField =
    type === "customer" ? selectedBill?.customerName : selectedBill?.vendorName;

  return (
    <div>
         <div className="space-y-6">
                {/* Bill Header */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {type === "customer" ? "Customer Information" : "Vendor Information"}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {nameField}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        selectedBill?.customerType === "regular"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedBill && selectedBill?.customerType.charAt(0).toUpperCase() +
                        selectedBill?.customerType.slice(1)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Bill Information
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Date:{" "}
                      {new Date(selectedBill?.date).toLocaleDateString()}
                    </p>
                    {/* <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        viewingBill.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : viewingBill.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {viewingBill.status.charAt(0).toUpperCase() +
                        viewingBill.status.slice(1)}
                    </span> */}
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Product
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Price
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Qty
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedBill?.items?.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item?.productName || item?.product?.productName}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.price}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                              {item?.totalAmount || item?.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{selectedBill?.subtotal || selectedBill?.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>{selectedBill?.tax || "0"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount:</span>
                      <span>-{selectedBill?.discount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium border-t pt-2">
                      <span>Total:</span>
                      <span>{selectedBill?.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default BillDetailsModal