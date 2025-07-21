import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(typeof price === 'string' ? parseFloat(price) : price);
  };

  // NBA product images - usando imágenes reales de productos NBA
  const getProductImage = (product: Product) => {
    if (product.imagen && product.imagen !== '') return product.imagen;
    return 'https://fanatics.frgimages.com/nba/mens-nba-nike-black-2022/23-swingman-jersey-icon-edition_ss4_p-13237+pv-1+u-ixqy5h8ywjfqhqjgqzpb+v-c4e2c8e8e8e8e8e8e8e8.jpg?_hv=2&w=600';
  };
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getProductImage({ ...product, imagen: '' });
          }}
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-red-600">
            {formatPrice(parseFloat(product.precio))}
          </span>
          {product.stock !== undefined && (
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2 w-full mb-1">
            {product.marca && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.marca.nombre}
              </span>
            )}
            {product.categoria && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {product.categoria.name}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md shadow transition-colors font-semibold text-base ${
              isInCart(product.id)
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {isInCart(product.id) ? 'En Carrito' : 'Agregar al Carrito'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;