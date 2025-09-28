{
  showDetailModal && (
    <Modal onClose={() => setShowDetailModal(false)} title={"Vendor Details"}>
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
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
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
            <h4 className="text-lg font-medium text-gray-900 mb-2">Payments</h4>
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
  );
}

///viewBillModal
<Modal
  isOpen={showViewModal}
  onClose={() => setShowViewModal(false)}
  title={`Bill Details - ${viewingBill?.billNumber}`}
  size="lg"
>
  {viewingBill && (
    <div className="space-y-6">
      {/* Bill Header */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Customer Information</h4>
          <p className="text-sm text-gray-600 mt-1">
            {viewingBill.customerName}
          </p>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
              viewingBill.customerType === "regular"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {viewingBill.customerType.charAt(0).toUpperCase() +
              viewingBill.customerType.slice(1)}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Bill Information</h4>
          <p className="text-sm text-gray-600 mt-1">
            Date: {new Date(viewingBill.createdAt).toLocaleDateString()}
          </p>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
              viewingBill.status === "paid"
                ? "bg-green-100 text-green-800"
                : viewingBill.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {viewingBill.status.charAt(0).toUpperCase() +
              viewingBill.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Items</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewingBill.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(viewingBill.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span>{formatCurrency(viewingBill.tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount:</span>
            <span>-{formatCurrency(viewingBill.discount)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium border-t pt-2">
            <span>Total:</span>
            <span>{formatCurrency(viewingBill.total)}</span>
          </div>
        </div>
      </div>
    </div>
  )}
</Modal>;


//Edit/Add Bill Modal
<Modal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title={editingBill ? 'Edit Bill' : 'Create New Bill'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <select
              required
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.type})
                </option>
              ))}
            </select>
          </div>

          {/* Add Items */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Items</h4>
            
            <div className="flex gap-4">
              <select
                value={newItem.productId}
                onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {formatCurrency(product.sellingPrice)} (Stock: {product.stock})
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Qty"
              />
              
              <Button type="button" onClick={addItemToBill}>
                Add Item
              </Button>
            </div>

            {/* Items List */}
            {formData.items.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.productName}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">{formatCurrency(item.total)}</td>
                        <td className="px-4 py-2">
                          <button
                            type="button"
                            onClick={() => removeItemFromBill(item.productId)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bill Totals */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.tax}
                onChange={(e) => setFormData({ ...formData, tax: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Totals Summary */}
          {formData.items.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateTotals().subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({formData.tax}%):</span>
                  <span>{formatCurrency(calculateTotals().taxAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span>-{formatCurrency(formData.discount)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateTotals().total)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingBill ? 'Update Bill' : 'Create Bill'}
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>


    // <>
    //   <form className="space-y-6 bg-white rounded-xl shadow-lg p-1.5">
    //     <div className="space-y-4 border rounded-xl p-5">
    //       <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
    //         Customer Information
    //       </h3>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {inputsData
    //           .filter((input) => input.type !== "array")
    //           .map((input) =>
    //             input.type === "select" ? (
    //               <div key={input.id} className="">
    //                 <label className="block mb-1 text-sm font-medium text-gray-600">
    //                   {input.label}
    //                 </label>
    //                 <select
    //                   id={input.id}
    //                   name={input.id}
    //                   required={input.required}
    //                   value={formData?.[input.id] || ""}
    //                   onChange={handleChange}
    //                   className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    //                 >
    //                   <option value="">Select</option>
    //                   {input.options.map((opt) => (
    //                     <option key={opt} value={opt}>
    //                       {opt}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //             ) : (
    //               <div key={input.id} className="">
    //                 <label className="block mb-1 text-sm font-medium text-gray-600">
    //                   {input.label}
    //                 </label>
    //                 <input
    //                   type={input.type}
    //                   id={input.id}
    //                   name={input.id}
    //                   placeholder={input.placeholder}
    //                   value={formData?.[input.id] || ""}
    //                   onChange={handleChange}
    //                   required={input.required}
    //                   className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    //                 />
    //               </div>
    //             )
    //           )}
    //       </div>
    //     </div>

    //     {/* Items Section */}
    //     <div className="p-5 border rounded-xl space-y-4">
    //       <div className="flex justify-between items-center border-b pb-2">
    //         <h3 className="text-lg font-semibold text-gray-800">Items</h3>
    //         <Button
    //           type="button"
    //           onClick={addItem}
    //           className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-3 py-1 rounded-lg"
    //         >
    //           <Plus className="w-4 h-4" /> Add Item
    //         </Button>
    //       </div>

    //       {(formData.items || []).map((item, index) => (
    //         <div
    //           key={index}
    //           className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-2 bg-gray-200 rounded-2xl"
    //         >
    //           <input
    //             type="text"
    //             name="product"
    //             placeholder="Product"
    //             value={item.product}
    //             onChange={(e) => handleItemChange(e, index)}
    //             className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    //           />
    //           <input
    //             type="number"
    //             name="quantity"
    //             placeholder="Qty"
    //             value={item.quantity}
    //             onChange={(e) => handleItemChange(e, index)}
    //             className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    //           />
    //           <input
    //             type="number"
    //             name="price"
    //             placeholder="Price"
    //             value={item.price}
    //             onChange={(e) => handleItemChange(e, index)}
    //             className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
    //           />
    //           <div className="flex justify-between items-center">
    //             <span className="font-semibold text-gray-700">
    //               {item.total || 0}
    //             </span>
    //             <button
    //               type="button"
    //               onClick={() => removeItem(index)}
    //               className="text-red-500 hover:text-red-700"
    //             >
    //               <Trash2 className="w-5 h-5" />
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="flex justify-between items-center pt-4 border-t">
    //       <div className="text-lg font-bold text-gray-800">
    //         Total Amount: Rs {formData.totalAmount || 0}
    //       </div>
    //       <div className="flex gap-4">
    //         <Button
    //           type="button"
    //           onClick={handleClose}
    //           className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl px-4 py-2"
    //         >
    //           Cancel
    //         </Button>
    //         <Button
    //           type="submit"
    //           className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2"
    //         >
    //           {submitLabel}
    //         </Button>
    //       </div>
    //     </div>
    //   </form>
    // </>



  //   return (

  //   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //     <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
  //       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
  //         Inventory Pro - Login
  //       </h2>
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         {/* Email */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //             placeholder="Enter your email"
  //           />
  //         </div>

  //         {/* Password */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
  //             placeholder="Enter your password"
  //           />
  //         </div>

  //         {/* Submit Button */}
  //         <button
  //           type="submit"
  //           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
  //         >
  //           Login
  //         </button>
  //       </form>

  //       {/* Extra Links */}
  //       <div className="mt-4 flex justify-between text-sm text-gray-600">
  //         <a href="#" className="hover:underline">
  //           Forgot Password?
  //         </a>
  //         <a href="#" className="hover:underline">
  //           Create Account
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );