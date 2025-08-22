import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Truck,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../redux/slice/vendorSlice";
// import { formatCurrency } from '../utils/calculations';

const Vendors = ({
  //   vendors,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    contact: "",
    address: "",
    totalTurnover: 0,
  });
  const dispatch = useDispatch()
  const { vendors, loading, error } = useSelector((state) => state.vendor)



//   useEffect(() => {
//     const res = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/vendor/all?vendorName=${searchInput}`
//         );
//         setVendorsData(res.data.data);
//         console.log(res.data.data);
//       } catch (error) {
//         setVendorsData([]);
//         console.log(error);
//       }
//     };
//     res();
//   }, [searchInput]);


useEffect(() => {
    dispatch(fetchVendors(searchInput))
}, [searchInput])

  const filteredVendors = vendors;
  //   vendors?.filter(vendor =>
  //     vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vendor.phone.includes(searchTerm)
  //   );

  const resetForm = () => {
    setFormData({
      vendorName: "",
      email: "",
      contact: "",
      address: "",
      totalTurnover: 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingVendor) {
      onUpdateVendor(editingVendor.id, formData);
    } else {
        onAddVendor(formData);
    }
    
    setEditingVendor(null);
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendorName: vendor.vendorName,
      email: vendor.email,
      contact: vendor.contact,
      address: vendor.address,
      totalTurnover: vendor.totalTurnover,
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingVendor(null);
    resetForm();
  };

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2 cursor-pointer" />
          Add Vendor
        </Button>
      </div>

      {/* Vendors List */}
      <Card>
        <div className="divide-y divide-gray-200">
          {filteredVendors?.map((vendor) => (
            <li
              key={vendor._id}
              className="py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors list-none"
              onClick={() => handleVendorClick(vendor)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Truck className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {vendor.vendorName}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-blue-600 font-medium">
                        PKR {vendor.totalTurnover} total purchases
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-48">
                        {vendor.contact}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(vendor);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 p-1 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteVendor(vendor._id);
                    }}
                    className="text-red-600 hover:text-red-900 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </Card>

      {filteredVendors?.length === 0 && (
        <div className="text-center py-12">
          <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No vendors found
          </h3>
          <p className="text-gray-500">
            {searchInput
              ? "Try adjusting your search criteria"
              : "Get started by adding your first vendor"}
          </p>
        </div>
      )}

      {/* Vendor Detail Modal */}
      {showDetailModal && (
        <Modal onClose={() => {setShowDetailModal(false)}} title={"Vendor Details"}>
          {selectedVendor && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Truck className="h-16 w-16 text-gray-400 bg-gray-100 rounded-full p-4" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedVendor.vendorName}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mt-1">
                    Total Purchases: PKR {selectedVendor.totalTurnover}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    Contact Information
                  </h4>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">
                        {selectedVendor.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">
                        {selectedVendor.contact}
                      </p>
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
                        {selectedVendor.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Vendor Since
                    </p>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedVendor.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Purchase Volume
                    </p>
                    <p className="text-sm text-gray-900 font-medium">
                      PKR {selectedVendor.totalTurnover}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEdit(selectedVendor);
                  }}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Vendor
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowDetailModal(false);
                    onDeleteVendor(selectedVendor.id);
                  }}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Vendor
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* Add/Edit Vendor Modal */}
      {showAddModal && (
        <Modal
          onClose={() => {
            setShowAddModal(false)
            resetForm();
            setEditingVendor(null)
          }}
          title={editingVendor ? "Edit Vendor" : "Add Vendor"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Name
              </label>
              <input
                type="text"
                required
                value={formData.vendorName}
                onChange={(e) =>
                  setFormData({ ...formData, vendorName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                rows={3}
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Turnover
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.totalTurnover}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalTurnover: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1 cursor-pointer">
                {editingVendor ? "Update Vendor" : "Add Vendor"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCloseModal}
                className="flex-1 cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Vendors;
