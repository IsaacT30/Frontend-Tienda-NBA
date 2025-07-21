import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Award, X } from 'lucide-react';
import { Brand } from '../../types';
import { ProductService } from '../../services/productService';
import { AdminService } from '../../services/adminService';

interface BrandsManagementProps {
  onStatsUpdate: () => void;
}

const BrandsManagement: React.FC<BrandsManagementProps> = ({ onStatsUpdate }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setIsLoading(true);
      const data = await ProductService.getBrands();
      setBrands(data);
    } catch (error) {
      console.error('Failed to load brands:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedBrand(null);
    setIsCreating(true);
    setFormData({ nombre: '', description: '' });
    setIsFormOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsCreating(false);
    setFormData({
      nombre: brand.nombre,
      description: brand.description || '',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (brand: Brand) => {
    if (window.confirm(`Are you sure you want to delete "${brand.nombre}"?`)) {
      try {
        await AdminService.deleteBrand(brand.id);
        await loadBrands();
        onStatsUpdate();
      } catch (error) {
        console.error('Failed to delete brand:', error);
        alert('Failed to delete brand');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validación: nombre no puede estar vacío
    if (!formData.nombre.trim()) {
      alert('El nombre de la marca es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    // Solo incluye description si tiene valor
    const brandToSend = formData.description
      ? { nombre: formData.nombre, description: formData.description }
      : { nombre: formData.nombre };

    try {
      if (isCreating) {
        await AdminService.createBrand(brandToSend);
      } else if (selectedBrand) {
        await AdminService.updateBrand(selectedBrand.id, brandToSend);
      }
      setIsFormOpen(false);
      await loadBrands();
      onStatsUpdate();
    } catch (error: any) {
      console.error('Failed to save brand:', error);
      if (error && error.message) {
        alert(`Error: ${error.message}`);
      } else if (error && error.response) {
        const errorText = await error.response.text();
        alert(`Error: ${errorText}`);
      } else {
        alert('Failed to save brand');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBrands = brands.filter(brand =>
    brand.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (brand.description && brand.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Award className="h-6 w-6" />
            <span>Brands Management</span>
          </h2>
          <p className="text-gray-600 mt-1">Manage product brands</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Brands Grid */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading brands...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{brand.nombre}</h3>
                    {brand.description && (
                      <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(brand)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {brand.id}
                </div>
              </div>
            ))}

            {filteredBrands.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No brands found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Brand Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {isCreating ? 'Create New Brand' : 'Edit Brand'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isCreating ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsManagement;