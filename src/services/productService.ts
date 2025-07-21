import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { Product, Category, Brand } from '../types';

export class ProductService {
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTOS, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTO_BY_ID(id), {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get product by ID error:', error);
      return null;
    }
  }

  static async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      console.error('Get categories error:', error);
      return [];
    }
  }

  static async getBrands(): Promise<Brand[]> {
    try {
      const response = await fetch(API_ENDPOINTS.MARCAS, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.items || [];
    } catch (error) {
      console.error('Get brands error:', error);
      return [];
    }
  }

  static async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTOS, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  }

  static async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTO_BY_ID(id), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTO_BY_ID(id), {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }
}