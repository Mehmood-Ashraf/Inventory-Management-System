import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCustomerBill, fetchAllCustomerBills } from "../redux/slice/customerBillSlice";


export const useCustomersBills = () => {
    const [addCustomerBillModal, setAddCustomerBillModal] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        customerType : "",
        customerName : "",
        billNumber : "",
        contact : "",
        city : "",
        contact : "",
        items : []
    })

    const handleCloseModal = () => {
        setAddCustomerBillModal(false)
        
    }

    const deleteCustomerBillHander = async (billId) => {
        try {
            await dispatch(deleteCustomerBill(billId)).unwrap();
            toast.success("Customer bill delted Successfully")
            await dispatch(fetchAllCustomerBills()).unwrap();
        } catch (error) {
            toast.error("Error in delete Customer Bill", error?.message)
        }
    };



    return {addCustomerBillModal, setAddCustomerBillModal, formData, setFormData, handleCloseModal, deleteCustomerBillHander}
};