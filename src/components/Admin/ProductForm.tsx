import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Product, Category, Brand } from '../../types';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  brands: Brand[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: FormData) => Promise<void>;
  isCreating: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  brands,
  isOpen,
  onClose,
  onSubmit,
  isCreating,
}) => {
  const [formData, setFormData] = useState<{
    nombre: string;
    descripcion: string;
    precio: string | number;
    imagen: string | File;
    // stock: string | number; // Eliminado
    categoria: string;
    marca: string;
  }>({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    // stock: '', // Eliminado
    categoria: '',
    marca: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        imagen: '', // No pre-cargar archivo, solo preview
        // stock: product.stock !== undefined && product.stock !== null ? String(product.stock) : '',
        categoria: product.categoria?.id || '',
        marca: product.marca?.id || '',
      });
      setImagePreview(product.imagen ? product.imagen : null);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        // stock: '',
        categoria: '',
        marca: '',
      });
      setImagePreview(null);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validación básica antes de enviar
    if (!formData.nombre || formData.precio === '' || formData.precio === null || formData.precio === undefined || !formData.marca) {
      setError('Nombre, precio y marca son obligatorios.');
      setIsSubmitting(false);
      return;
    }
    // Forzar precio a número válido SIEMPRE
    let precioValue = Number(formData.precio);
    if (isNaN(precioValue) || formData.precio === '' || formData.precio === null || formData.precio === undefined) {
      precioValue = 0;
    }
    // Eliminado manejo de stock

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('precio', String(precioValue));
      data.append('descripcion', formData.descripcion || '');
      if (formData.imagen && formData.imagen instanceof File) {
        data.append('imagen', formData.imagen);
      }
      // No enviar stock
      if (formData.marca) {
        data.append('marca', formData.marca);
      }
      if (formData.categoria) {
        data.append('categoria', formData.categoria);
      }
      await onSubmit(data);
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isCreating ? 'Create New Product' : 'Edit Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio *
              </label>
              <input
                type="number"
                step="any"
                value={formData.precio === '' || formData.precio === null || formData.precio === undefined ? 0 : formData.precio}
                onChange={e => setFormData({ ...formData, precio: e.target.value === '' ? 0 : Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>


            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Marca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <select
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Selecciona una marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Imagen desde el ordenador */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen (opcional)
              </label>
              <input
                type="file"
                name="imagen"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) {
                    setFormData({ ...formData, imagen: file });
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setFormData({ ...formData, imagen: '' });
                    setImagePreview(null);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 max-h-32 rounded shadow" />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;