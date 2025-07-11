"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Plus, MapPin, Edit, Trash2, Search, 
  PackageOpen, CheckCircle, XCircle, Filter, ChevronDown
} from 'lucide-react';

const WarehousesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddWarehouse, setShowAddWarehouse] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Mock warehouse data - simplified to just pickup locations
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Central Pickup Location",
      address: "123 Main Street, New York, NY 10001",
      status: "active",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "West Coast Pickup",
      address: "456 Ocean Avenue, Los Angeles, CA 90001",
      status: "active",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      name: "Midwest Pickup Point",
      address: "789 Prairie Road, Chicago, IL 60007",
      status: "inactive",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      name: "Southern Pickup Location",
      address: "321 Peach Street, Atlanta, GA 30301",
      status: "active",
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      name: "Northeast Pickup Point",
      address: "654 Maple Avenue, Boston, MA 02101",
      status: "inactive",
      lastUpdated: "2 weeks ago"
    }
  ]);

  // Form state for adding/editing warehouses - simplified
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    address: '',
    status: 'active'
  });

  // Filter and sort warehouses
  const filteredWarehouses = warehouses
    .filter(warehouse => {
      // Filter by status
      if (filterStatus !== 'all' && warehouse.status !== filterStatus) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          warehouse.name.toLowerCase().includes(query) ||
          warehouse.address.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      
      // Apply sort direction
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setShowFilterMenu(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouseForm({
      ...warehouseForm,
      [name]: value
    });
  };

  const handleAddWarehouse = () => {
    setWarehouseForm({
      name: '',
      address: '',
      status: 'active'
    });
    setShowAddWarehouse(true);
    setEditingWarehouse(null);
  };

  const handleEditWarehouse = (warehouse) => {
    setWarehouseForm({
      name: warehouse.name,
      address: warehouse.address,
      status: warehouse.status
    });
    setShowAddWarehouse(true);
    setEditingWarehouse(warehouse.id);
  };

  const handleSubmitWarehouse = (e) => {
    e.preventDefault();
    
    if (editingWarehouse) {
      // Update existing warehouse
      setWarehouses(warehouses.map(w => 
        w.id === editingWarehouse 
          ? { 
              ...w, 
              ...warehouseForm, 
              lastUpdated: 'Just now' 
            } 
          : w
      ));
    } else {
      // Add new warehouse
      const newWarehouse = {
        ...warehouseForm,
        id: warehouses.length + 1,
        lastUpdated: 'Just now'
      };
      setWarehouses([...warehouses, newWarehouse]);
    }
    
    setShowAddWarehouse(false);
    setEditingWarehouse(null);
  };

  const handleDeleteWarehouse = (id) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
    setShowDeleteConfirm(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center text-gray-600 hover:text-gray-900 p-2 -ml-2">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back</span>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Pickup Locations</h1>
            </div>
            <button
              onClick={handleAddWarehouse}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Location</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search pickup locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 text-gray-500" />
                <span>
                  {filterStatus === 'all' ? 'All Statuses' : 
                   filterStatus === 'active' ? 'Active' : 'Inactive'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${filterStatus === 'all' ? 'bg-purple-50 text-purple-600' : ''}`}
                  >
                    All Statuses
                  </button>
                  <button
                    onClick={() => handleFilterChange('active')}
                    className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${filterStatus === 'active' ? 'bg-purple-50 text-purple-600' : ''}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleFilterChange('inactive')}
                    className={`block w-full text-left px-4 py-3 hover:bg-gray-50 ${filterStatus === 'inactive' ? 'bg-purple-50 text-purple-600' : ''}`}
                  >
                    Inactive
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warehouses List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-4">
              <button 
                onClick={() => handleSort('name')}
                className={`flex items-center gap-1 text-sm font-medium ${sortBy === 'name' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                Location Name
                {sortBy === 'name' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
            <div className="col-span-5">
              <span className="text-sm font-medium text-gray-600">Address</span>
            </div>
            <div className="col-span-2">
              <button 
                onClick={() => handleSort('status')}
                className={`flex items-center gap-1 text-sm font-medium ${sortBy === 'status' ? 'text-purple-600' : 'text-gray-600'}`}
              >
                Status
                {sortBy === 'status' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
            <div className="col-span-1 text-right">
              <span className="text-sm font-medium text-gray-600">Actions</span>
            </div>
          </div>

          {/* Table Body */}
          {filteredWarehouses.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredWarehouses.map(warehouse => (
                <div key={warehouse.id} className="p-4 hover:bg-gray-50">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{warehouse.name}</h3>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditWarehouse(warehouse)}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full"
                          aria-label="Edit location"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(warehouse.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                          aria-label="Delete location"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{warehouse.address}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      {getStatusBadge(warehouse.status)}
                      <span className="text-sm text-gray-500">Updated {warehouse.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <h3 className="font-medium text-gray-900">{warehouse.name}</h3>
                      <p className="text-xs text-gray-500">Updated {warehouse.lastUpdated}</p>
                    </div>
                    <div className="col-span-5">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 line-clamp-2">{warehouse.address}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      {getStatusBadge(warehouse.status)}
                    </div>
                    <div className="col-span-1 flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditWarehouse(warehouse)}
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                        aria-label="Edit location"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(warehouse.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        aria-label="Delete location"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <PackageOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No pickup locations found</h3>
              <p className="text-gray-500 mb-4 px-4">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search query' 
                  : 'Add your first pickup location to get started'}
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <button
                  onClick={handleAddWarehouse}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Pickup Location</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Warehouse Modal */}
      {showAddWarehouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingWarehouse ? 'Edit Pickup Location' : 'Add New Pickup Location'}
              </h2>
            </div>
            <form onSubmit={handleSubmitWarehouse} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={warehouseForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter location name"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={warehouseForm.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full address"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={warehouseForm.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddWarehouse(false);
                    setEditingWarehouse(null);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 order-1 sm:order-2"
                >
                  {editingWarehouse ? 'Save Changes' : 'Add Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this pickup location? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteWarehouse(showDeleteConfirm)}
                  className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 order-1 sm:order-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehousesPage; 