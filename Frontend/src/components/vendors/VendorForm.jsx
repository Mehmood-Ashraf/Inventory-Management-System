import React from 'react'
import Button from '../Button'
import useVendors from '../../hooks/useVendors'

const VendorForm = ({ formData, setFormData, editingVendor, handleSubmit, handleCloseModal}) => {

  return (
    <div>
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
              <Button type="submit" className="flex-1 cursor-pointer" onClick={handleSubmit}>
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
    </div>
  )
}

export default VendorForm