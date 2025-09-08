import React from "react";
import Button from "./Button";
import { Plus, Trash2 } from "lucide-react";

const BillForm = ({
  formData,
  setFormData,
  handleClose,
  handleSubmit,
  inputsData,
  submitLabel,
}) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleItemChange = (e, index) => {
    if (!e?.target) return;
    const { name, value, type } = e.target;
    const updatedItems = [...(formData.items || [])];

    updatedItems[index] = {
      ...updatedItems[index],
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    };

    updatedItems[index].total =
      (updatedItems[index].quantity || 0) * (updatedItems[index].price || 0);

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: updatedItems.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      ),
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        { product: "", quantity: 1, price: 0, total: 0 },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: updatedItems.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      ),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, handleClose);
  };

  return (
    // <form onSubmit={onSubmit} className="space-y-4">
    //   {inputsData.map((input) =>
    //     input.type === "array" ? (
    //       <div key={input.id}>
    //         <label className="block font-medium mb-1">{input.label}</label>
    //         {(formData.items || []).map((item, index) => (
    //           <div key={index} className="grid grid-cols-4 gap-2 mb-2">
    //             {input.fields.map((field) => (
    //               <input
    //                 key={field.id}
    //                 type={field.type}
    //                 name={field.id}
    //                 placeholder={field.label}
    //                 value={item[field.id] || ""}
    //                 onChange={(e) => handleItemChange(index, e)}
    //                 readOnly={field.readOnly}
    //                 className="border px-2 py-1 rounded-lg"
    //               />
    //             ))}
    //             <button
    //               type="button"
    //               onClick={() => removeItem(index)}
    //               className="text-red-500"
    //             >
    //               X
    //             </button>
    //           </div>
    //         ))}
    //         <Button
    //           type="button"
    //           onClick={addItem}
    //           className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg"
    //         >
    //           + Add Item
    //         </Button>
    //       </div>
    //     ) : input.type === "select" ? (
    //       <div key={input.id}>
    //         <label className="block mb-1">{input.label}</label>
    //         <select
    //           id={input.id}
    //           name={input.id}
    //           required={input.required}
    //           value={formData?.[input.id] || ""}
    //           onChange={handleChange}
    //           className="w-full border px-3 py-2 rounded-lg"
    //         >
    //           <option value="">Select</option>
    //           {input.options.map((opt) => (
    //             <option key={opt} value={opt}>
    //               {opt}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //     ) : (
    //       <div key={input.id}>
    //         <label className="block mb-1">{input.label}</label>
    //         <input
    //           type={input.type}
    //           id={input.id}
    //           name={input.id}
    //           placeholder={input.placeholder}
    //           value={formData?.[input.id] || ""}
    //           onChange={handleChange}
    //           required={input.required}
    //           className="w-full border px-3 py-2 rounded-lg"
    //         />
    //       </div>
    //     )
    //   )}

    //   {/* Total */}
    //   <div className="font-bold text-lg">Total Amount: {formData.totalAmount || 0}</div>

    //   <div className="flex space-x-3 pt-4">
    //     <Button type="submit" className="flex-1">
    //       {submitLabel}
    //     </Button>
    //     <Button
    //       type="button"
    //       variant="secondary"
    //       onClick={handleClose}
    //       className="flex-1"
    //     >
    //       Cancel
    //     </Button>
    //   </div>
    // </form>

    <>
      <form className="space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-4 border rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputsData
              .filter((input) => input.type !== "array")
              .map((input) =>
                input.type === "select" ? (
                  <div key={input.id} className="">
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      {input.label}
                    </label>
                    <select
                      id={input.id}
                      name={input.id}
                      required={input.required}
                      value={formData?.[input.id] || ""}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {input.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div key={input.id} className="">
                    <label className="block mb-1 text-sm font-medium text-gray-600">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      id={input.id}
                      name={input.id}
                      placeholder={input.placeholder}
                      value={formData?.[input.id] || ""}
                      onChange={handleChange}
                      required={input.required}
                      className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )
              )}
          </div>
        </div>
        //Items Section
        <div className="p-5 border rounded-xl space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">Items</h3>
            <Button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-3 py-1 rounded-lg"
            >
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </div>

          {(formData.items || []).map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-2 bg-gray-200 rounded-2xl"
            >
              <input
                type="text"
                name="product"
                placeholder="Product"
                value={item.product}
                onChange={(e) => handleItemChange(e, index)}
                className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(e, index)}
                className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(e, index)}
                className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  {item.total || 0}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-lg font-bold text-gray-800">
            Total Amount: Rs {formData.totalAmount || 0}
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2"
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BillForm;
