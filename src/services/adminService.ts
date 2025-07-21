import { API_ENDPOINTS, getAuthHeaders } from '../config/api';
import { Product, Category, Brand, User, AdminStats } from '../types';
import { AuthService } from './authService';

export class AdminService {
  // Crear usuario (admin)
  static async createUser(userData: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  }): Promise<User> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: 'POST',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return await response.json();
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  }
  private static getAdminHeaders() {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    return getAuthHeaders(token);
  }

  // Products Management
  static async createProduct(productData: FormData): Promise<Product> {
    try {
      const headers = this.getAdminHeaders();
      // Elimina Content-Type si existe, fetch lo maneja con FormData
      if ('Content-Type' in headers) {
        delete (headers as any)['Content-Type'];
      }
      const response = await fetch(API_ENDPOINTS.PRODUCTOS, {
        method: 'POST',
        headers,
        body: productData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error (createProduct):', errorText);
        throw new Error('Failed to create product: ' + errorText);
      }
      return await response.json();
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  }

  static async updateProduct(id: string, productData: FormData): Promise<Product> {
    try {
      const headers = this.getAdminHeaders();
      if ('Content-Type' in headers) {
        delete (headers as any)['Content-Type'];
      }
      const response = await fetch(API_ENDPOINTS.PRODUCTO_BY_ID(id), {
        method: 'PUT',
        headers,
        body: productData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error (updateProduct):', errorText);
        throw new Error('Failed to update product: ' + errorText);
      }
      return await response.json();
    } catch (error) {
      console.error('Update product error:', error);
      throw error;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTO_BY_ID(id), {
        method: 'DELETE',
        headers: this.getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }

  // Categories Management
  static async createCategory(categoryData: Omit<Category, 'id'>): Promise<Category> {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES, {
        method: 'POST',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      return await response.json();
    } catch (error) {
      console.error('Create category error:', error);
      throw error;
    }
  }

  static async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(id), {
        method: 'PUT',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      return await response.json();
    } catch (error) {
      console.error('Update category error:', error);
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(id), {
        method: 'DELETE',
        headers: this.getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Delete category error:', error);
      throw error;
    }
  }

  // Brands Management
  static async createBrand(brandData: Omit<Brand, 'id'>): Promise<Brand> {
    try {
      const response = await fetch(API_ENDPOINTS.MARCAS, {
        method: 'POST',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        throw new Error('Failed to create brand');
      }

      return await response.json();
    } catch (error) {
      console.error('Create brand error:', error);
      throw error;
    }
  }

  static async updateBrand(id: string, brandData: Partial<Brand>): Promise<Brand> {
    try {
      const response = await fetch(API_ENDPOINTS.MARCA_BY_ID(id), {
        method: 'PUT',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(brandData),
      });

      if (!response.ok) {
        throw new Error('Failed to update brand');
      }

      return await response.json();
    } catch (error) {
      console.error('Update brand error:', error);
      throw error;
    }
  }

  static async deleteBrand(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.MARCA_BY_ID(id), {
        method: 'DELETE',
        headers: this.getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete brand');
      }
    } catch (error) {
      console.error('Delete brand error:', error);
      throw error;
    }
  }

  // Users Management
  static async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        headers: this.getAdminHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      // Soporta diferentes formatos de respuesta
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.items)) return data.items;
      if (data.data && Array.isArray(data.data.items)) return data.data.items;
      if (Array.isArray(data.data)) return data.data;
      return [];
    } catch (error) {
      console.error('Get users error:', error);
      return [];
    }
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(API_ENDPOINTS.USER_BY_ID(id), {
        method: 'PUT',
        headers: this.getAdminHeaders(),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.USER_BY_ID(id), {
        method: 'DELETE',
        headers: this.getAdminHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  // Dashboard Stats
  static async getAdminStats(): Promise<AdminStats> {
    try {
      const [products, categories, brands, users] = await Promise.all([
        fetch(API_ENDPOINTS.PRODUCTOS, { headers: this.getAdminHeaders() }),
        fetch(API_ENDPOINTS.CATEGORIES, { headers: this.getAdminHeaders() }),
        fetch(API_ENDPOINTS.MARCAS, { headers: this.getAdminHeaders() }),
        fetch(API_ENDPOINTS.USERS, { headers: this.getAdminHeaders() }),
      ]);

      const [productsData, categoriesData, brandsData, usersData] = await Promise.all([
        products.json(),
        categories.json(),
        brands.json(),
        users.json(),
      ]);

      return {
        totalProducts: Array.isArray(productsData) ? productsData.length : productsData.items?.length || 0,
        totalCategories: Array.isArray(categoriesData) ? categoriesData.length : categoriesData.items?.length || 0,
        totalBrands: Array.isArray(brandsData) ? brandsData.length : brandsData.items?.length || 0,
        totalUsers: Array.isArray(usersData) ? usersData.length : usersData.items?.length || 0,
        totalOrders: 0, // Placeholder
      };
    } catch (error) {
      console.error('Get admin stats error:', error);
      return {
        totalProducts: 0,
        totalCategories: 0,
        totalBrands: 0,
        totalUsers: 0,
        totalOrders: 0,
      };
    }
  }
}