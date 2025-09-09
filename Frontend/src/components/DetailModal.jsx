import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteVendor } from "../redux/slice/vendorSlice";
import { deleteCustomer } from "../redux/slice/customersSlice";
import { Edit, Mail, MapPin, Phone, Trash2, Truck, User } from "lucide-react";
import Button from "./Button";

const DetailModal = ({ type, data, handleEdit, setShowDetailModal, onDelete, viewBills }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const icon = type === "vendor" ? Truck : User;
  const title = type === "vendor" ? data?.vendorName : data?.customerName;

  const deleteHandler = () => {
    setShowDetailModal(false);
    if (type === "vendor") {
      dispatch(deleteVendor(data?._id));
    } else {
      dispatch(deleteCustomer(data?._id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {React.createElement(icon, {
            className: "h-16 w-16 text-gray-400 bg-gray-100 rounded-full p-4",
          })}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {type === "vendor" && (
            <p className="text-lg text-blue-600 font-medium mt-1">
              Total Turnover: PKR {data?.totalTurnover}
            </p>
          )}
        </div>
      </div>

      {/* Contact + Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">
            Contact Information
          </h4>
          {data?.email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{data?.email}</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-sm text-gray-900">{data?.contact}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Address</h4>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Business Address
              </p>
              <p className="text-sm text-gray-900 leading-relaxed">
                {data?.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">
              {type === "vendor" ? "Vendor Since" : "Customer Since"}
            </p>
            <p className="text-sm text-gray-900">
              {new Date(data?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {type === "vendor" ? (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Purchase Volume
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  PKR {data?.totalTurnover}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-sm text-green-600 font-medium">
                  PKR {data?.totalPaid}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Balance</p>
                <p className="text-sm text-red-600 font-medium">
                  PKR {data?.balance}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">Balance</p>
                <p className="text-sm text-red-600 font-medium">
                  PKR {data?.balance}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
          <div className="border-t flex space-x-3 pt-4">
            <Button className="flex-1 cursor-pointer" onClick={viewBills}>
              View Bills
            </Button>
            <Button className="flex-1 cursor-pointer">
              View Payments
            </Button>
          </div>

      <div className="flex space-x-3 pt-4">
        <Button
          onClick={() => {
            setShowDetailModal(false);
            handleEdit(data);
          }}
          className="flex-1 cursor-pointer"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit {type}
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(data._id)}
          className="flex-1 cursor-pointer"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete {type}
        </Button>
      </div>
    </div>
  );
};

export default DetailModal;
