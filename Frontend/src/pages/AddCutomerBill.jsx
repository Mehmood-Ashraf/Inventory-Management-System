import React, { useEffect } from 'react'
import BillForm from '../components/BillForm'
import { useCustomersBills } from '../hooks/useCustomersBills'
import { customerBillsInputs } from '../formSource'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSingleCustomer, fetchSingleCustomer } from '../redux/slice/customersSlice'

const AddCutomerBill = () => {

  const { formData, setFormData, handleAddCustomerBill, handleCloseAddBill} = useCustomersBills();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId")

  const dispatch = useDispatch();
  const singleCustomer = useSelector((state) => state.customer.singleCustomer)

  //agar customerId hai to singleCustomer fetch karenge
  useEffect(() => {
    if(customerId){
      dispatch(fetchSingleCustomer(customerId))
    }
  } , [customerId, dispatch])

  useEffect(() => {
    if(singleCustomer){
      setFormData((prev) => ({
        ...prev, 
        customerName : singleCustomer?.customerName,
        contact : singleCustomer?.contact,
        city : singleCustomer?.city,
        address : singleCustomer?.address,
        customerType : singleCustomer?.customerType
      }))
    }
  }, [singleCustomer, setFormData])

  return (
    <div>
        <BillForm 
        inputsData={customerBillsInputs}
        formData={formData}
        setFormData={setFormData}
        submitLabel={"Save Bill"}
        handleSubmit={handleAddCustomerBill}
        handleClose={handleCloseAddBill}
        />
    </div>
  )
}

export default AddCutomerBill