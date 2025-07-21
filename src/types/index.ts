export interface User {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  profile_image?: string;
  created_at?: string;
  updated_at?: string;
  role: UserRole;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen?: string;
  stock?: number;
  categoria?: Category;
  marca?: Brand;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: string;
  nombre: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  direccionEnvio: string;
  metodoPago: string;
  subtotal: number;
  total: number;
  orden: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  articuloId: string;
  cantidad: number;
  precio?: number;
}

export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  direccionEnvio: string;
  metodoPago: string;
  subtotal: number;
  total: number;
  orden: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  message?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  CUSTOMER = 'customer',
  MODERATOR = 'moderator',
}

export interface AdminStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalUsers: number;
  totalOrders: number;
}

export interface Payment {
  _id?: string;
  idPedido: string;
  idCliente: string;
  metodoPago: string;
  monto: number;
  estado: string;
  fechaPago: string;
}

export interface Shipment {
  _id?: string;
  idPedido: string;
  idCliente: string;
  direccionEnvio: string;
  fechaEnvio: string | Date;
  transportista: string;
  estado: string;
}