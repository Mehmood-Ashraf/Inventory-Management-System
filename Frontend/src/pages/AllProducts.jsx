import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/slice/productSlice";
import Table from "../components/Table";

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState("");
  const { allProducts, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

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

  const productListHeaders = [
    { key: "productName", label: "Product Name" },
    { key: "modelName", label: "Model" },
    { key: "quantity", label: "Qauntity" },
    { key: "sellPrice", label: "Sell Price" },
    { key: "companyName", label: "Company Name" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder={"Search Products....."}
        />

        <Button>
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
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
