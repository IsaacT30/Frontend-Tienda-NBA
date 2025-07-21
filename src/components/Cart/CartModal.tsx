import React from 'react';
import { X, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, totalAmount, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(typeof price === 'string' ? parseFloat(price) : price);
  };

  const getProductImage = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('lakers')) {
      return 'https://fanatics.frgimages.com/los-angeles-lakers/mens-mitchell-and-ness-x-blackpink-purple-los-angeles-lakers-hardwood-classics-swingman-jersey-limited-edition_ss5_p-203285500+pv-1+u-j9giph5odba1gjfgazva+v-r3noxcypaki1i0maqs7j.jpg?_hv=2&w=200';
    }
    return 'https://fanatics.frgimages.com/nba/mens-nba-nike-black-2022/23-swingman-jersey-icon-edition_ss4_p-13237+pv-1+u-ixqy5h8ywjfqhqjgqzpb+v-c4e2c8e8e8e8e8e8e8e8.jpg?_hv=2&w=200';
  };
  const handleCheckout = () => {
    if (isAuthenticated) {
      onCheckout();
    } else {
      onClose();
      // Show login modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span>Carrito de Compras ({items.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-600">Comienza a comprar para agregar productos a tu carrito</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.imagen || getProductImage(item.product.nombre)}
                      alt={item.product.nombre}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getProductImage(item.product.nombre);
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.nombre}</h3>
                    <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                    {item.product.marca && (
                      <p className="text-xs text-gray-500">{item.product.marca.nombre}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(totalAmount)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Continuar Comprando
              </button>
              <button
                onClick={handleCheckout}
                className="py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-sm text-gray-600 text-center mt-3">
                Necesitas iniciar sesión para proceder al pago
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;