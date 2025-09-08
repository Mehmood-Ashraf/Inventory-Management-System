import { useState } from "react";


export const useCustomersBills = () => {
    const [addCustomerBillModal, setAddCustomerBillModal] = useState(false);
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

    const deleteCustomerBill = (billId) => {
        
    }

    return {addCustomerBillModal, setAddCustomerBillModal, formData, setFormData, handleCloseModal}
};