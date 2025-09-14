import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { FileText, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slice/productSlice";
import Table from "../components/Table";
import useProducts from "../hooks/useProducts";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import ProductDetails from "../components/ProductDetails";

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState("");
  const { allProducts, loading, error, singleProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { formData, setFormData, handleSubmit, showProductForm, setShowProductForm, handleCloseProductForm, handleDeleteProduct, productDetailHandler, setShowProductDetails, showProductDetails } = useProducts();
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res = await dispatch(fetchAllProducts(searchInput)).unwrap();
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData()
    if (searchInput) {
      const handler = setTimeout(() => {
        dispatch(fetchAllProducts(searchInput));
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      dispatch(fetchAllProducts(searchInput));
    }
  }, [searchInput]);

  const companyName = allProducts?.companyName?.companyName;

  const productListHeaders = [
    { key: "productName", label: "Product Name" },
    { key: "modelName", label: "Model" },
    { key: "quantity", label: "Qauntity" },
    { key: "sellPrice", label: "Sell Price" },
    // { key: "companyName", label: "Company Name" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder={"Search Products....."}
        />

        <Button onClick={() => setShowProductForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div>
        {allProducts && (
          <Table
            title={"All Products"}
            subTitle={"Easily track all products and stock"}
            data={allProducts}
            showActions={true}
            headers={productListHeaders}
            Icon={FileText}
            onDelete={handleDeleteProduct}
            onView={productDetailHandler}
            type={"Product"}
          />
        )}

      </div>

      {showProductForm && (
        <Modal
        title={"Add Product"}
        onClose={handleCloseProductForm}
        >
          <ProductForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleClose={handleCloseProductForm}
          />
        </Modal>
      )}

      {
        showProductDetails && (
          <Modal
          // title={"Product Details"}
          onClose={() => setShowProductDetails(false)}
          >

            <ProductDetails 
            product={singleProduct}
            />
          </Modal>
        )
      }
    </div>
  );
};

export default AllProducts;
