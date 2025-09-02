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
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value);
    setFormData((prev)=>({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={(e) => handleSubmit(e, handleClose)}
      >
        {inputsData.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.label}
            </label>

            {input.type === "textarea" ? (
              <textarea
                id={input.id}
                placeholder={input.placeholder}
                name={input.id}
                required={input.required}
                value={formData?.[input.id] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : input.type === "select" ? (
              <select
                id={input.id}
                name={input.id}
                required={input.required}
                value={formData?.[input.id] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Customer Type</option>
                {input.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={input.id}
                placeholder={input.placeholder}
                name={input.id}
                required={input.required}
                type={input.type}
                value={formData?.[input.id] || ""}
                onChange={handleChange}
                onInput={(e) =>
                  console.log("TYPING:", e.target.name, e.target.value)
                }
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
