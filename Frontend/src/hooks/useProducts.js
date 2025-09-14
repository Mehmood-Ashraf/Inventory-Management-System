import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slice/productSlice";
import { toast } from "react-toastify";

const useProducts = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    companyName: "",
    modelName: "",
    category: "",
    purchasePrice: "",
    sellPrice: "",
    quantity: "",
  });
  const dispatch = useDispatch();

  const handleCloseProductForm = () => {
    setShowProductForm(false);
  };

  const productDetailsHandler = (productId) => {
    try {
    } catch (error) {}
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      companyName: "",
      modelName: "",
      category: "",
      purchasePrice: "",
      sellPrice: "",
      quantity: "",
    });
  };

  const handleSubmit = async (productData) => {
    try {
      await dispatch(addProduct(productData)).unwrap();
      toast.success("Product added successfully");
      resetForm();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return {
    productDetailsHandler,
    showProductForm,
    setShowProductForm,
    handleCloseProductForm,
    handleSubmit,
    formData,
    setFormData
  };
};

export default useProducts;
