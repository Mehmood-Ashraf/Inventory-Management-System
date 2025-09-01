import React from "react";
import Button from "./Button";

const Form = ({
  handleSubmit,
  inputsData,
  formData,
  setFormData,
  handleClose,
  submitLabel = "Submit",
}) => {
  const handleChange = (e, id, type) => {
    const value =
      type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {inputsData.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.label}
            </label>

            {input.type === "textarea" ? (
              <textarea
                id={input.id}
                placeholder={input.placeholder}
                required={input.required}
                value={formData?.[input.id] || ""}
                onChange={(e) => handleChange(e, input.id, input.type)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={input.id}
                placeholder={input.placeholder}
                required={input.required}
                type={input.type}
                value={formData?.[input.id] || ""}
                onChange={(e) => handleChange(e, input.id, input.type)}
              />
            )}
          </div>
        ))}

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1 cursor-pointer">
            {submitLabel}
          </Button>
          <Button
            className="flex-1 cursor-pointer"
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
