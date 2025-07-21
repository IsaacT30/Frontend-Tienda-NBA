import React, { useEffect, useState } from 'react';
import { Shipment } from '../../types';
import { ShipmentService } from '../../services/shipmentService';

const ShipmentsManagement: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [formData, setFormData] = useState<Omit<Shipment, '_id'>>({
    idPedido: '',
    idCliente: '',
    direccionEnvio: '',
    fechaEnvio: '',
    transportista: '',
    estado: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchShipments = async () => {
    const data = await ShipmentService.getAll();
    setShipments(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await ShipmentService.update(editingId, formData);
    } else {
      await ShipmentService.create(formData);
    }
    setFormData({ idPedido: '', idCliente: '', direccionEnvio: '', fechaEnvio: '', transportista: '', estado: '' });
    setEditingId(null);
    fetchShipments();
  };

  const handleEdit = (shipment: Shipment) => {
    setFormData({
      idPedido: shipment.idPedido,
      idCliente: shipment.idCliente,
      direccionEnvio: shipment.direccionEnvio,
      fechaEnvio: shipment.fechaEnvio,
      transportista: shipment.transportista,
      estado: shipment.estado,
    });
    setEditingId(shipment._id!);
  };

  const handleDelete = async (id: string) => {
    await ShipmentService.delete(id);
    fetchShipments();
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Envíos</h2>

      <form className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8" onSubmit={handleSubmit}>
        <input type="text" name="idPedido" value={formData.idPedido} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="ID Pedido" required />
        <input type="text" name="idCliente" value={formData.idCliente} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="ID Cliente" required />
        <input type="text" name="direccionEnvio" value={formData.direccionEnvio} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Dirección" required />
        <input type="date" name="fechaEnvio" value={formData.fechaEnvio as string} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required />
        <input type="text" name="transportista" value={formData.transportista} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Transportista" required />
        <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="col-span-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Estado" required />
        <div className="col-span-1 flex items-center space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">
            {editingId ? 'Actualizar Envío' : 'Agregar Envío'}
          </button>
          {editingId && (
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors font-semibold" onClick={() => { setFormData({ idPedido: '', idCliente: '', direccionEnvio: '', fechaEnvio: '', transportista: '', estado: '' }); setEditingId(null); }}>
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
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">ID Pedido</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">ID Cliente</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Dirección</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Fecha</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Transportista</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Estado</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s._id} className={editingId === s._id ? 'bg-yellow-100' : 'hover:bg-gray-50'}>
                <td className="py-2 px-4 text-xs text-gray-700">{s._id}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{s.idPedido}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{s.idCliente}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{s.direccionEnvio}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{typeof s.fechaEnvio === 'string' ? s.fechaEnvio.split('T')[0] : ''}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{s.transportista}</td>
                <td className="py-2 px-4 text-xs text-gray-700">{s.estado}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs font-semibold" onClick={() => handleEdit(s)}>Editar</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs font-semibold" onClick={() => handleDelete(s._id!)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsManagement;
