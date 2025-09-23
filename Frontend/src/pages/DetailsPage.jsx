import React, { useEffect } from "react";
import Button from "../components/Button";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCustomer } from "../redux/slice/customersSlice";
import { fetchSingleVendor } from "../redux/slice/vendorSlice";
import { useCustomersBills } from "../hooks/useCustomersBills";
import Modal from "../components/Modal";
import BillDetailsModal from "../components/BillDetailsModal";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};


const customerBillsListHeaders = [
  { key: "date", label: "Date" },
  // { key: "customerName", label: "Customer Name" },
  { key: "billNumber", label: "Bill No" },
  { key: "totalAmount", label: "Amount" },
];

const customerPaymentsListHeaders = [
  { key: "date", label: "Date", render: (row) => formatDate(row.date) },
  { key: "method", label: "Method" },
  { key: "amount", label: "Amount" },
];

const DetailsPage = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    billDetailsHandler,
    showBillDetailsModal,
    handleCloseBillDetailModal,
  } = useCustomersBills();

  const singleCustomer = useSelector((state) => state.customer.singleCustomer);
  const singleVendor = useSelector((state) => state.vendor.singleVendor);
  const {singleBill} = useSelector((state) => state.customerBills)

  const entityData = type === "customer" ? singleCustomer : singleVendor;

  useEffect(() => {
    if (type === "customer") {
      dispatch(fetchSingleCustomer(id));
      console.log(singleCustomer);
    } else if (type === "vendor") {
      dispatch(fetchSingleVendor(id));
    }
  }, [type, id, dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Button
          variant="secondary"
          className="flex gap-4 items-center"
          size="lg"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex gap-3">
          <Button
            size="lg"
            variant="success"
            className="flex items-center gap-2"
            onClick={() => navigate(`/add_customer_bill?customerId=${id}`)}
          >
            <Plus className="w-4 h-4" />
            Add Bill
          </Button>
          <Button size="lg" variant="primary">
            {type === "customer" ? "Edit Customer" : "Edit Vendor"}
          </Button>
          <Button size="lg" variant="danger">
            {type === "customer" ? "Delete Customer" : "Delete Vendor"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <Card
          title={
            type === "customer"
              ? entityData?.customerName || "Customer Details"
              : entityData?.vendorName || "Vendor Details"
          }
          className="col-span-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium">
                  {entityData?.contact || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Customer Type</p>
                <p>
                  {entityData?.customerType ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
          ${
            entityData.customerType === "premium"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
                    >
                      {entityData.customerType}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                      N/A
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {entityData?.address || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="text-gray-500" />
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">
                  {entityData?.city || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title={"Account Summary"} className="col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="text-gray-500" />
                <span className="text-sm text-muted-foreground">
                  Total Bills
                </span>
              </div>
              <span className="font-semibold text-lg">
                {entityData?.bills.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-gray-500" />
                <span className="text-sm text-muted-foreground">
                  Total Turnover
                </span>
              </div>
              <span className="font-semibold text-lg">
                PKR {entityData?.totalTurnover.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="text-gray-500" />
                <span className="text-sm text-muted-foreground">
                  Current Balance
                </span>
              </div>
              <span className="font-semibold text-lg">
                PKR {entityData?.currentBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Table
          title={type === "customer" ? "Bills & Invoices" : "Vendor Bills"}
          subTitle={
            type === "customer"
              ? `Total ${entityData?.bills?.length || 0} bills`
              : `Total ${entityData?.bills?.length || 0}  bills`
          }
          Icon={FileText}
          headers={customerBillsListHeaders}
          data={singleCustomer?.bills}
          showActions={true}
          type={"bill"}
          onView={billDetailsHandler}
        />

        <Table
          title={"Payment Details"}
          subTitle={`Total ${entityData?.payments?.length || 0} payments`}
          Icon={CreditCard}
          headers={customerPaymentsListHeaders}
          data={singleCustomer?.payments}
          type={"payment"}
        />
      </div>

      {showBillDetailsModal && (
        <Modal onClose={handleCloseBillDetailModal} title={"Customer Bill Details"}>
          <BillDetailsModal 
          type={"customer"}
          selectedBill={singleBill}
          />
        </Modal>
      )}
    </div>
  );
};

export default DetailsPage;
