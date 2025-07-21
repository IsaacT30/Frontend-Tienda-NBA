import React, { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { OrderService } from '../../services/orderService';
import { ShipmentService } from '../../services/shipmentService';
import { PaymentService } from '../../services/paymentService';
import { CreateOrderData } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    direccionEnvio: '',
    metodoPago: 'Tarjeta',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;


    // Validar dirección de envío
    if (!formData.direccionEnvio.trim()) {
      alert('Por favor ingresa la dirección de envío.');
      return;
    }
    // Validar productos en carrito
    if (!items || items.length === 0) {
      alert('No hay productos en el carrito.');
      return;
    }
    // Validación dinámica de campos de tarjeta
    if (formData.metodoPago === 'Tarjeta') {
      if (!formData.nameOnCard || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        alert('Por favor completa todos los datos de la tarjeta.');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const orderData: CreateOrderData = {
        userId: user.id,
        items: items.map(item => ({
          articuloId: item.productId,
          cantidad: item.quantity,
          precio: item.price,
        })),
        direccionEnvio: formData.direccionEnvio,
        metodoPago: formData.metodoPago,
        subtotal: totalAmount,
        total: totalAmount + (totalAmount * 0.08), // Add 8% tax
        orden: `ORD-${Date.now()}`,
      };

      // 1. Crear la orden
      let order;
      try {
        order = await OrderService.createOrder(orderData);
      } catch (err: any) {
        setIsProcessing(false);
        alert('Error al crear la orden: ' + (err?.message || err));
        return;
      }
      setOrderNumber(order.orden);

      // 2. Guardar dirección de envío en envíos

      try {
        // Forzar fechaEnvio como Date real en el body
        const envioPayload = {
          idPedido: String(order.id),
          idCliente: String(user.id),
          direccionEnvio: formData.direccionEnvio,
          fechaEnvio: new Date().toISOString(), // Enviar como string ISO
          transportista: 'Por asignar',
          estado: 'pendiente',
        };
        // Si el backend sigue fallando, prueba con fechaEnvio: new Date(Date.now())
        await ShipmentService.create(envioPayload);
      } catch (err: any) {
        setIsProcessing(false);
        alert('Error al guardar el envío: ' + (err?.message || err));
        return;
      }

      // 3. Guardar orden de pago en pagos
      try {
        await PaymentService.create({
          idPedido: String(order.id),
          idCliente: String(user.id),
          metodoPago: formData.metodoPago === 'Bank Transfer' ? 'Transferencia Bancaria' : formData.metodoPago,
          monto: order.total,
          estado: 'pendiente',
          fechaPago: new Date().toISOString(),
        });
      } catch (err: any) {
        setIsProcessing(false);
        alert('Error al registrar el pago: ' + (err?.message || err));
        return;
      }

      setIsComplete(true);
      clearCart();
    } catch (error) {
      setIsProcessing(false);
      alert('Error inesperado: ' + (typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error)));
      console.error('Order creation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsComplete(false);
    setOrderNumber('');
    setFormData({
      direccionEnvio: '',
      metodoPago: 'Tarjeta',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
    });
  };

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Orden Confirmada!</h2>
          <p className="text-gray-600 mb-4">
           Su pedido se ha realizado correctamente.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Numero de Orden</p>
            <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  const subtotal = totalAmount;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Pagar</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Dirección de envío</span>
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección Completa
                    </label>
                    <textarea
                      value={formData.direccionEnvio}
                      onChange={(e) => setFormData({ ...formData, direccionEnvio: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Información de Pago</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Método de Pago
                      </label>
                      <select
                        value={formData.metodoPago}
                        onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="Tarjeta">Tarjeta de Crédito</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Transferencia Bancaria</option>
                      </select>
                    </div>

                    {formData.metodoPago === 'Tarjeta' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre en la Tarjeta
                          </label>
                          <input
                            type="text"
                            value={formData.nameOnCard}
                            onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            required={formData.metodoPago === 'Tarjeta'}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Tarjeta
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                            placeholder="1234 5678 9012 3456"
                            required={formData.metodoPago === 'Tarjeta'}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha de Vencimiento
                            </label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                              placeholder="MM/YY"
                              required={formData.metodoPago === 'Tarjeta'}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                              placeholder="123"
                              required={formData.metodoPago === 'Tarjeta'}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Procesando...' : `Pagar ${formatPrice(total)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.nombre}</p>
                        <p className="text-sm text-gray-600">Cant: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impuestos</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;