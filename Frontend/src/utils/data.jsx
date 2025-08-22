{showDetailModal && (
        <Modal
          onClose={() => setShowDetailModal(false)}
          title={"Vendor Details"}
        >
          {selectedVendor && (
            <div className="space-y-6">
              {/* Top Info */}
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

              {/* Contact + Address */}
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

              {/* Stats Section */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Paid
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      PKR {selectedVendor.totalPaid}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Balance</p>
                    <p className="text-sm text-red-600 font-medium">
                      PKR {selectedVendor.balance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vendor Bills */}
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Vendor Bills
                </h4>
                {selectedVendor.vendorBills?.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedVendor.vendorBills.map((bill, idx) => (
                      <li key={idx} className="py-2">
                        <p className="text-sm text-gray-900">
                          Bill #{idx + 1}: PKR {bill.amount} - {bill.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No bills found</p>
                )}
              </div>

              {/* Payments */}
              <div className="border-t pt-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Payments
                </h4>
                {selectedVendor.payments?.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedVendor.payments.map((payment, idx) => (
                      <li key={idx} className="py-2">
                        <p className="text-sm text-gray-900">
                          Payment #{idx + 1}: PKR {payment.amount} on{" "}
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No payments found</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleEdit(selectedVendor);
                  }}
                  className="flex-1 cursor-pointer"
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
                  className="flex-1 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Vendor
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
