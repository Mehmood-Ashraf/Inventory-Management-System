import React, { useState } from 'react';
import { Plus, Search, User, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

const Customers = ({ 
  customers, 
//   onAddCustomer, 
  onUpdateCustomer, 
  onDeleteCustomer 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    type: 'regular',
    email: '',
    phone: '',
    address: ''
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone?.includes(searchTerm);
    const matchesType = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesType;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'regular',
      email: '',
      phone: '',
      address: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const customerData = {
      name: formData.name,
      type: formData.type,
      ...(formData.type === 'regular' && {
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      })
    };

    if (editingCustomer) {
      onUpdateCustomer(editingCustomer.id, customerData);
      setEditingCustomer(null);
    } else {
        const handleAddCustomer = (customerData) => {
    const newCustomer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCustomers([...customers, newCustomer]);
  };

    }

    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      type: customer.type,
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || ''
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCustomer(null);
    resetForm();
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Customers</option>
            <option value="regular">Regular</option>
            <option value="walk-in">Walk-in</option>
          </select>
        </div>
        
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Customers List */}
      <Card>
        <div className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <li 
              key={customer.id} 
              className="py-4 px-6 hover:bg-gray-50 cursor-pointer transition-colors list-none"
              onClick={() => handleCustomerClick(customer)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <User className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {customer.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        customer.type === 'regular' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                      </span>
                      {customer.email && (
                        <span className="text-xs text-gray-500 truncate max-w-48">
                          {customer.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(customer);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCustomer(customer.id);
                    }}
                    className="text-red-600 hover:text-red-900 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first customer'}
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Customer Details"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <User className="h-16 w-16 text-gray-400 bg-gray-100 rounded-full p-4" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h3>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                  selectedCustomer.type === 'regular' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedCustomer.type.charAt(0).toUpperCase() + selectedCustomer.type.slice(1)} Customer
                </span>
              </div>
            </div>

            {selectedCustomer.type === 'regular' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Contact Information</h4>
                  
                  {selectedCustomer.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedCustomer.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Address</h4>
                  
                  {selectedCustomer.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-sm text-gray-900 leading-relaxed">{selectedCustomer.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer Since</p>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedCustomer);
                }}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Customer
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  setShowDetailModal(false);
                  onDeleteCustomer(selectedCustomer.id);
                }}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Customer
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="regular">Regular Customer</option>
              <option value="walk-in">Walk-in Customer</option>
            </select>
          </div>

          {formData.type === 'regular' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingCustomer ? 'Update Customer' : 'Add Customer'}
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
    </div>
  );
};

export default Customers;