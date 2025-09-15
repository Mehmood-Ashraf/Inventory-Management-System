import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct, fetchSingleProduct, updateProduct } from "../redux/slice/productSlice";
import { toast } from "react-toastify";

const useProducts = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
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
    resetForm();
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


  const productDetailHandler = async (productId) => {
    try {
        const product = await dispatch(fetchSingleProduct(productId)).unwrap()
        if(product){
            setShowProductDetails(true)
            toast.success("Single Product Fetch successfully")
        }else{
            toast.error("Product not found")
        }
    } catch (error) {
        toast.error(error?.message || error?.payload || "Something went wrong")
    }
  }

  const handleSubmit = async (productData) => {
    try {
      const payload = { ...productData };
      if (!payload.companyName) delete payload.companyName;
      if (!payload.category) delete payload.category;
      await dispatch(addProduct(payload)).unwrap();
      toast.success("Product added successfully");
      resetForm();
      setShowProductForm(false)
    } catch (error) {
      toast.error(error?.message || error?.payload);
    }
  };

  const handleUpdate = async () => {
    dispatch(updateProduct({
      id : selectedProduct._id,
      productData : selectedProduct
    }))
    setEditProduct(false)
  };

  const handleEditProduct = (product) => {
    setEditProduct(true);
    setSelectedProduct(product);
  }

  const handleDeleteProduct = async (id) => {
    try {
        await dispatch(deleteProduct(id)).unwrap()
        toast.success("Product deleted successfully")
    } catch (error) {
        toast.error(error?.message || error?.payload)
    }
  }

  return {
    productDetailsHandler,
    showProductForm,
    setShowProductForm,
    handleCloseProductForm,
    handleSubmit,
    formData,
    setFormData,
    handleDeleteProduct,
    productDetailHandler,
    showProductDetails,
    setShowProductDetails,
    editProduct, setEditProduct, handleEditProduct, selectedProduct, setSelectedProduct, handleUpdate
  };
};

export default useProducts;
