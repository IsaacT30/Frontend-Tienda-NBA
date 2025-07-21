import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { Payment } from '../types';
import { AuthService } from './authService';

export class PaymentService {
  static async getAll(): Promise<Payment[]> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.PAGOS, {
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) throw new Error('Error al obtener pagos');
      const data = await response.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      return [];
    }
  }

  static async create(data: Omit<Payment, '_id'>): Promise<Payment> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.PAGOS, {
        method: 'POST',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMsg = 'Error al crear pago';
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg += ': ' + JSON.stringify(errorData.message);
          }
        } catch {}
        throw new Error(errorMsg);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear pago:', error);
      throw error;
    }
  }

  static async update(id: string, data: Partial<Payment>): Promise<Payment> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.PAGO_BY_ID(id), {
        method: 'PUT',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al actualizar pago');
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar pago:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.PAGO_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) throw new Error('Error al eliminar pago');
    } catch (error) {
      console.error('Error al eliminar pago:', error);
      throw error;
    }
  }
}
