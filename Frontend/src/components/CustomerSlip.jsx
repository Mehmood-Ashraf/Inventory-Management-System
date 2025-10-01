import React, { forwardRef } from "react";

const CustomerSlip = forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className="w-80mm p-3 text-sm bg-white shadow-md mx-auto">
      <div className="flex justify-center items-center">
        <img src="/download.png" alt="A-Z logo" className="w-16 h-16" />
      </div>
      <p>Date: {new Date(formData?.date).toLocaleDateString("en-GB")}</p>
      <p>Customer: {formData?.customerName || formData?.customerType}</p>
      <hr className="my-2 border-dashed border-gray-400" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="text-left py-1 px-2">Product</th>
            <th className="text-center py-1 px-2">Quantity</th>
            <th className="text-center py-1 px-2">Price</th>
            <th className="text-right px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {(formData.items || []).map((item, i) => (
            <tr key={i} className="text-sm">
              <td className="py-1 px-2">{item.product}</td>
              <td className="py-1 px-2 text-center">{item.quantity}</td>
              <td className="py-1 px-2 text-center">{item.price}</td>
              <td className="py-1 px-2 text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="my-2 border-dashed border-gray-400" />
      <p className="text-right font-semibold">
        Total Rs: {formData?.totalAmount || 0}
      </p>
      <p>Thank you! Visit Again</p>
    </div>
  );
});

export default CustomerSlip;
