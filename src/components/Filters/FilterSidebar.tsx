import React from 'react';
import { Filter, X } from 'lucide-react';
import { Category, Brand } from '../../types';

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  onCategoryChange: (categoryId: string) => void;
  onBrandChange: (brandId: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b lg:border-b-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filtros</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Clear Filters */}
          <button
            onClick={onClearFilters}
            className="w-full text-left text-red-600 hover:text-red-700 font-medium"
          >
            Limpiar filtros
          </button>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`block w-full text-left p-2 rounded-md transition-colors ${
                  selectedCategory === '' 
                    ? 'bg-red-100 text-red-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Todas las Categorías
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`block w-full text-left p-2 rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-100 text-red-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Marcas</h3>
            <div className="space-y-2">
              <button
                onClick={() => onBrandChange('')}
                className={`block w-full text-left p-2 rounded-md transition-colors ${
                  selectedBrand === '' 
                    ? 'bg-red-100 text-red-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Todas las Marcas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => onBrandChange(brand.id)}
                  className={`block w-full text-left p-2 rounded-md transition-colors ${
                    selectedBrand === brand.id
                      ? 'bg-red-100 text-red-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {brand.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Rango de Precio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Precio Mínimo</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Precio Máximo</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;