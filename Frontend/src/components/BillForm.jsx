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
      [name]:
        type === "number"
          ? value === ""
            ? ""
            : parseFloat(value) || 0
          : value,
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
    <>
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-5">Add Bill</h2>

        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          {/* Customer Information */}
          <div className="bg-white shadow-md rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inputsData
                .filter((input) => input.type !== "array")
                .map((input) =>
                  input.type === "select" ? (
                    <div key={input.id}>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        {input.label}
                      </label>
                      <select
                        id={input.id}
                        name={input.id}
                        required={input.required}
                        value={formData?.[input.id] || ""}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    <div key={input.id}>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
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
                        className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  )
                )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Bill Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData?.date || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-white shadow-md rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Items</h3>
              <Button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-xl"
              >
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {(formData.items || []).map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50 p-4 rounded-xl"
                >
                  <input
                    type="text"
                    name="product"
                    placeholder="Product"
                    value={item.product}
                    onChange={(e) => handleItemChange(e, index)}
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Qty"
                    value={item?.quantity ?? ""}
                    onChange={(e) => handleItemChange(e, index)}
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={item?.price ?? ""}
                    onChange={(e) => handleItemChange(e, index)}
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      Rs {item.total || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center bg-white shadow-md rounded-2xl p-6">
            <div className="text-xl font-bold text-gray-900">
              Total Amount: Rs {formData.totalAmount || 0}
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleClose}
                className="bg-red-600 text-gray-700 hover:bg-red-700 rounded-xl px-6 py-2"
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
      </div>
    </>
  );
};

export default BillForm;
