// ...existing code...
import React, { useEffect, useState } from 'react';
import { Payment } from '../../types';
import { PaymentService } from '../../services/paymentService';

const PaymentsManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [formData, setFormData] = useState<Payment>({
    idPedido: '',
    idCliente: '',
    metodoPago: '',
    monto: 0,
    estado: '',
    fechaPago: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPayments = async () => {
    const data = await PaymentService.getAll();
    setPayments(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pagoData: Payment = {
      ...formData,
      monto: Number(formData.monto),
      fechaPago: new Date(formData.fechaPago).toISOString(),
    };
    if (editingId) {
      await PaymentService.update(editingId, pagoData);
    } else {
      await PaymentService.create(pagoData);
    }
    setFormData({ idPedido: '', idCliente: '', metodoPago: '', monto: 0, estado: '', fechaPago: '' });
    setEditingId(null);
    fetchPayments();
  };

  const handleEdit = (payment: Payment) => {
    setFormData({
      idPedido: payment.idPedido,
      idCliente: payment.idCliente,
      metodoPago: payment.metodoPago,
      monto: payment.monto,
      estado: payment.estado,
      fechaPago: payment.fechaPago ? payment.fechaPago.split('T')[0] : '',
      _id: payment._id,
    });
    setEditingId(payment._id!);
  };

  const handleDelete = async (id: string) => {
    await PaymentService.delete(id);
    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Pagos</h2>

      <form className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8" onSubmit={handleSubmit}>
        <input type="text" name="idPedido" value={formData.idPedido} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" placeholder="ID Pedido" required />
        <input type="text" name="idCliente" value={formData.idCliente} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" placeholder="ID Cliente" required />
        <input type="text" name="metodoPago" value={formData.metodoPago} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" placeholder="Método de Pago" required />
        <input type="number" name="monto" value={formData.monto} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" placeholder="Monto" required />
        <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" placeholder="Estado" required />
        <input type="date" name="fechaPago" value={formData.fechaPago} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500" required />
        <div className="col-span-1 flex items-center space-x-2">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold">
            {editingId ? 'Actualizar Pago' : 'Agregar Pago'}
          </button>
          {editingId && (
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors font-semibold" onClick={() => { setFormData({ idPedido: '', idCliente: '', metodoPago: '', monto: 0, estado: '', fechaPago: '' }); setEditingId(null); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Pedido</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Cliente</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Método</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Monto</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Estado</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Fecha</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pago) => (
              <tr key={pago._id} className={editingId === pago._id ? 'bg-yellow-100' : 'hover:bg-gray-50'}>
                <td className="py-2 px-4 text-xs text-gray-700">{pago._id}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{pago.idPedido}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{pago.idCliente}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{pago.metodoPago}</td>
                <td className="py-2 px-4 text-xs text-gray-700">${pago.monto}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{pago.estado}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{pago.fechaPago ? pago.fechaPago.split('T')[0] : ''}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs font-semibold" onClick={() => handleEdit(pago)}>Editar</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs font-semibold" onClick={() => handleDelete(pago._id!)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentsManagement;
