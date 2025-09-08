export const addCustomerInputs = [
  {
    id: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Customer name.....",
    required: true,
  },
  { id: "contact", label: "Contact", type: "text", placeholder: "03********" },
  {
    id: "customerType",
    label: "Customer Type",
    type: "select",
    options: ["walkin", "regular"],
    required: true,
  },
  { id: "address", label: "Address", type: "textarea", placeholder: "adderss" },
  { id: "city", label: "City", type: "text", placeholder: "city" },
];

export const customerBillsInputs = [
  {
    id: "customerName",
    label: "Customer Name",
    type: "text",
    placeholder: "Enter customer name.....",
    required: true,
  },
  {
    id: "customerType",
    label: "Customer Type",
    type: "select",
    options: ["walkin", "regular"],
    required: true,
  },
  {
    id: "billNumber",
    label: "Bill Number",
    type: "text",
    placeholder: "Unique Bill Number",
    required: false,
  },
  { id: "contact", label: "Contact", type: "text", placeholder: "03********" },
  { id: "address", label: "Address", type: "textarea", placeholder: "adderss" },
  { id: "city", label: "City", type: "text", placeholder: "city" },
  {
    id: "items",
    label: "Items",
    type: "array", // 👈 ye custom type banayenge
    fields: [
      { id: "product", label: "Product", type: "text", required: true },
      { id: "quantity", label: "Quantity", type: "number", required: true },
      { id: "price", label: "Price", type: "number", required: true },
      {
        id: "total",
        label: "Total",
        type: "number",
        required: false,
        readOnly: true,
      },
    ],
  },
];
