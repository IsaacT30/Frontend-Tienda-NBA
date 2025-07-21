import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem, getCartItem } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedQuantity);
    onClose();
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
    return 'https://fanatics.frgimages.com/nba/mens-nba-nike-black-2022/23-swingman-jersey-icon-edition_ss4_p-13237+pv-1+u-ixqy5h8ywjfqhqjgqzpb+v-c4e2c8e8e8e8e8e8e8e8.jpg?_hv=2&w=800';
  };
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const cartItem = getCartItem(product.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getProductImage(product)}
                alt={product.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getProductImage({ ...product, imagen: '' });
                }}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.nombre}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  {product.marca && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product.marca.nombre}
                    </span>
                  )}
                  {product.categoria && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.categoria.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.2 out of 5)</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-red-600">
                {formatPrice(parseFloat(product.precio))}
              </div>

              <div className="prose prose-sm text-gray-600">
                <p>{product.descripcion}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Talla</h3>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-12 text-center">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              // ...se eliminó la sección de información de stock...

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-semibold text-base shadow"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>
                    {cartItem ? `Actualizar Carrito (${cartItem.quantity})` : 'Agregar al Carrito'}
                  </span>
                </button>
                <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Free shipping</span>
                  <span className="font-medium">On orders over $75</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Returns</span>
                  <span className="font-medium">30-day return policy</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Authenticity</span>
                  <span className="font-medium">100% authentic NBA merchandise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;