import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { Plus } from "lucide-react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerBills } from "../redux/slice/customerBillSlice";

const AllCustomerBills = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch()
  const {allCustomerBills, loading, error} = useSelector((state) => state.customerBills)
  
  
  useEffect(() => {
      dispatch(fetchAllCustomerBills(searchInput))
    }, [])
    console.log(allCustomerBills)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <SearchInput
          placeholder={"Search Bill......"}
          value={searchInput}
          onChange={setSearchInput}
        />

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Bill
        </Button>
      </div>




    </div>
  );
};

export default AllCustomerBills;
