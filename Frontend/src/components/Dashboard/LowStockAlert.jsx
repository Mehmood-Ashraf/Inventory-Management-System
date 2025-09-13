import React from "react";
import Card1 from "../../components/Card";
import { PackageX, TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import { Loader } from "../Loader";

const LowStockAlert = () => {
  const { lowStockProducts, loading } = useSelector((state) => state.product);


  return (
    <div className="w-full">
      <Card1 title={"Low Stock Alert"} className="lg:w-full cursor-pointer">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <Loader />
          </div>
        ) : !lowStockProducts || lowStockProducts?.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-gray-500 py-6">
            <PackageX className="w-10 h-10 mb-2" />
            <p>No low stock products right now</p>
          </div>
        ) : (
          lowStockProducts?.map((product) => (
            <Card1
              key={product._id}
              iconClass={"text-red-500"}
              icon={TriangleAlert}
              title={product?.productName}
              subtitle={`Stock : ${product?.quantity}`}
              className="border-red-400 mb-2"
            ></Card1>
          ))
        )}
      </Card1>
    </div>
  );
};

export default LowStockAlert;
