import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { Order, CreateOrderData } from '../types';
import { AuthService } from './authService';

export class OrderService {
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ORDENES, {
        method: 'POST',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }

  static async getOrders(): Promise<Order[]> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ORDENES, {
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      console.error('Get orders error:', error);
      return [];
    }
  }

  static async getOrderById(id: string): Promise<Order | null> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ORDEN_BY_ID(id), {
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get order by ID error:', error);
      return null;
    }
  }

  static async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ORDEN_BY_ID(id), {
        method: 'PUT',
        headers: getAuthHeaders(token || undefined),
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update order error:', error);
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    try {
      const token = AuthService.getToken();
      const response = await fetch(API_ENDPOINTS.ORDEN_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(token || undefined),
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order error:', error);
      throw error;
    }
  }
}