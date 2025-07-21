import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { Shipment } from '../types';
import { AuthService } from './authService';

export class ShipmentService {
  static async getAll(): Promise<Shipment[]> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ENVIOS, {
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) throw new Error('Error al obtener envíos');
      const data = await response.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      console.error('Error al obtener envíos:', error);
      return [];
    }
  }

  static async create(data: Shipment): Promise<Shipment> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ENVIOS, {
        method: 'POST',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let msg = 'Error al crear envío';
        try {
          const errData = await response.json();
          if (errData?.message) msg += ': ' + JSON.stringify(errData.message);
        } catch {}
        throw new Error(msg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear envío:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Shipment>): Promise<Shipment> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ENVIO_BY_ID(id), {
        method: 'PUT',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al actualizar envío');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar envío:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ENVIO_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) throw new Error('Error al eliminar envío');
    } catch (error) {
      console.error('Error al eliminar envío:', error);
      throw error;
    }
  }
}
