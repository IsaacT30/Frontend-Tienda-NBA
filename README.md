# 🏀 NBA E-Commerce Project

## 📋 Índice
- [Descripción General](#-descripción-general)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías y Dependencias](#-tecnologías-y-dependencias)
- [Arquitectura de la Aplicación](#-arquitectura-de-la-aplicación)
- [Configuración de API](#-configuración-de-api)
- [Tipos TypeScript](#-tipos-typescript)
- [Componentes Principales](#-componentes-principales)
- [Servicios](#-servicios)
- [Contextos](#-contextos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Funcionalidades](#-funcionalidades)
- [Estructura de Archivos Detallada](#-estructura-de-archivos-detallada)

## 🏀 Descripción General

NBA E-Commerce es una aplicación web moderna de comercio electrónico especializada en productos oficiales de la NBA. La aplicación está construida con React 18, TypeScript, Vite y Tailwind CSS, ofreciendo una experiencia de usuario fluida y moderna.

### Características Principales:
- 🛍️ Catálogo completo de productos NBA
- 🛒 Carrito de compras persistente
- 👤 Sistema de autenticación completo
- 📱 Diseño responsive y moderno
- 🎨 Animaciones fluidas con Framer Motion
- 👑 Panel de administración completo
- 💳 Proceso de checkout integrado
- 🔍 Sistema de filtros y búsqueda avanzado

## 🏗️ Estructura del Proyecto

```
nba-e-commerce/
├── 📋 Configuración
│   ├── package.json              # Dependencias y scripts NPM
│   ├── vite.config.ts            # Configuración Vite + Proxy API
│   ├── tsconfig.json             # Configuración TypeScript base
│   ├── tsconfig.app.json         # Configuración TypeScript app
│   ├── tsconfig.node.json        # Configuración TypeScript Node
│   ├── eslint.config.js          # Configuración ESLint
│   ├── tailwind.config.js        # Configuración Tailwind CSS
│   ├── postcss.config.js         # Configuración PostCSS
│   └── index.html                # HTML principal
│
├── 📁 src/
│   ├── 🎯 main.tsx               # Punto de entrada React
│   ├── 🎨 App.tsx                # Componente raíz
│   ├── 🎨 index.css              # Estilos globales + Tailwind
│   ├── ⚙️ vite-env.d.ts          # Tipos de entorno Vite
│   │
│   ├── 📦 assets/logos/          # Recursos estáticos
│   │   ├── ChicagoBullsLogo.jpg  # Logo Chicago Bulls
│   │   ├── Jugadores.jpg         # Imagen jugadores
│   │   ├── LakersLogo.jpg        # Logo Lakers
│   │   └── logoNBA.svg           # Logo oficial NBA
│   │
│   ├── 🧩 components/            # Componentes React
│   │   ├── 👑 Admin/             # Panel administración
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── BrandsManagement.tsx
│   │   │   ├── CategoriesManagement.tsx
│   │   │   ├── PaymentsManagement.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── ProductsManagement.tsx
│   │   │   ├── ShipmentsManagement.tsx
│   │   │   └── UsersManagement.tsx
│   │   │
│   │   ├── 🔐 Auth/              # Autenticación
│   │   │   └── AuthModal.tsx
│   │   │
│   │   ├── 🛒 Cart/              # Carrito compras
│   │   │   └── CartModal.tsx
│   │   │
│   │   ├── 💳 Checkout/          # Proceso compra
│   │   │   └── CheckoutModal.tsx
│   │   │
│   │   ├── 🔍 Filters/           # Filtros productos
│   │   │   └── FilterSidebar.tsx
│   │   │
│   │   ├── 🏠 Home/              # Página principal
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── HomePage.tsx
│   │   │
│   │   ├── 🎨 Layout/            # Diseño y navegación
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   │
│   │   └── 📦 Product/           # Productos
│   │       ├── ProductCard.tsx
│   │       ├── ProductGrid.tsx
│   │       └── ProductModal.tsx
│   │
│   ├── ⚙️ config/                # Configuraciones
│   │   └── api.ts                # Endpoints y headers API
│   │
│   ├── 🏪 context/               # Contextos React
│   │   ├── AuthContext.tsx       # Estado autenticación global
│   │   └── CartContext.tsx       # Estado carrito global
│   │
│   ├── 🔧 services/              # Servicios API
│   │   ├── adminService.ts       # CRUD administración
│   │   ├── authService.ts        # Login/Register/JWT
│   │   ├── orderService.ts       # Gestión órdenes
│   │   ├── paymentService.ts     # Procesamiento pagos
│   │   ├── productService.ts     # CRUD productos
│   │   └── shipmentService.ts    # Gestión envíos
│   │
│   └── 📝 types/                 # Definiciones TypeScript
│       └── index.ts              # Interfaces y tipos principales
```

## 🛠️ Tecnologías y Dependencias

### **⚛️ Frontend Core**
```json
{
  "react": "^18.3.1",              // Librería UI principal
  "react-dom": "^18.3.1",          // DOM renderer
  "typescript": "^5.5.3",          // Lenguaje tipado
  "vite": "^5.4.2"                 // Build tool ultra-rápido
}
```

### **🎨 Styling & UI**
```json
{
  "tailwindcss": "^3.4.1",         // CSS utility-first
  "framer-motion": "^12.23.3",     // Animaciones avanzadas
  "lucide-react": "^0.344.0",      // Iconos modernos
  "autoprefixer": "^10.4.18",      // Prefijos CSS automáticos
  "postcss": "^8.4.35"             // Procesador CSS
}
```

### **🧭 Routing & State**
```json
{
  "react-router-dom": "^7.6.3"     // Enrutamiento SPA
}
```

### **📝 Forms & Validation**
```json
{
  "react-hook-form": "^7.60.0",           // Formularios performantes
  "@hookform/resolvers": "^5.1.1",        // Integraciones validadores
  "yup": "^1.6.1"                         // Esquemas validación
}
```

### **🌐 HTTP & API**
```json
{
  "axios": "^1.10.0"               // Cliente HTTP con interceptors
}
```

### **🍞 UX Enhancements**
```json
{
  "react-hot-toast": "^2.5.2"      // Notificaciones elegantes
}
```

### **🔍 Development Tools**
```json
{
  "eslint": "^9.9.1",              // Linting código
  "typescript-eslint": "^8.3.0",   // ESLint para TypeScript
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.11"
}
```

## 🏢 Arquitectura de la Aplicación

### **🎯 Jerarquía de Componentes**
```tsx
App.tsx
├── AuthProvider          // 🔐 Estado autenticación global
│   └── CartProvider      // 🛒 Estado carrito global
│       └── AppContent    // 📱 Lógica principal aplicación
│           ├── Header    // 🎨 Navegación superior
│           ├── Main      // 📋 Contenido principal
│           │   ├── HomePage ───────── Página inicial
│           │   ├── ProductGrid ───── Lista productos
│           │   └── AdminDashboard ── Panel admin
│           ├── Footer    // 🎨 Pie de página
│           └── Modals    // 🪟 Ventanas emergentes
│               ├── ProductModal
│               ├── AuthModal
│               ├── CartModal
│               └── CheckoutModal
```

### **📊 Flujo de Datos**
```
1. 🌐 API Call (Service Layer)
2. 📦 Data Processing (Service)
3. 🏪 State Update (Context)
4. ⚛️ Component Re-render
5. 🎨 UI Update (Component)
```

### **🔄 Gestión de Estado**

#### **🔐 AuthContext - Estado de Autenticación**
```typescript
interface AuthContextType {
  user: User | null;                    // Usuario actual
  isAuthenticated: boolean;             // Estado login
  isLoading: boolean;                   // Cargando
  login: (credentials) => Promise<void>; // Iniciar sesión
  register: (userData) => Promise<void>; // Registrarse
  logout: () => void;                   // Cerrar sesión
  refreshUser: () => Promise<void>;     // Actualizar datos
}
```

#### **🛒 CartContext - Estado del Carrito**
```typescript
interface CartContextType {
  items: CartItem[];                    // Productos en carrito
  totalItems: number;                   // Cantidad total items
  totalAmount: number;                  // Monto total
  addItem: (product, quantity?) => void; // Agregar producto
  removeItem: (productId) => void;      // Remover producto
  updateQuantity: (id, quantity) => void; // Actualizar cantidad
  clearCart: () => void;                // Vaciar carrito
  isInCart: (productId) => boolean;     // Verificar si está
  getCartItem: (productId) => CartItem; // Obtener item específico
}
```

## 🌐 Configuración de API

### **🎯 Base URL**
```typescript
const API_BASE_URL = 'https://tienda_nba_app-api.desarrollo-software.xyz';
```

### **📍 Endpoints Principales**
```typescript
export const API_ENDPOINTS = {
  // 🔐 Autenticación
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  
  // 👥 Usuarios
  USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
  USER_PROFILE: (id: string) => `${API_BASE_URL}/users/${id}/profile`,
  
  // 📦 Productos
  PRODUCTOS: `${API_BASE_URL}/productos`,
  PRODUCTO_BY_ID: (id: string) => `${API_BASE_URL}/productos/${id}`,
  
  // 🏷️ Categorías
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id: string) => `${API_BASE_URL}/categories/${id}`,
  
  // 🏢 Marcas
  MARCAS: `${API_BASE_URL}/marcas`,
  MARCA_BY_ID: (id: string) => `${API_BASE_URL}/marcas/${id}`,
  
  // 📋 Órdenes
  ORDENES: `${API_BASE_URL}/ordenes`,
  ORDEN_BY_ID: (id: string) => `${API_BASE_URL}/ordenes/${id}`,
  
  // 💳 Pagos
  PAGOS: `${API_BASE_URL}/pagos`,
  PAGO_BY_ID: (id: string) => `${API_BASE_URL}/pagos/${id}`,
  
  // 🚚 Envíos
  ENVIOS: `${API_BASE_URL}/envios`,
  ENVIO_BY_ID: (id: string) => `${API_BASE_URL}/envios/${id}`,
  
  // 📧 Email
  MAIL_GMAIL: `${API_BASE_URL}/mail/gmail`,
  MAIL_SENDGRID: `${API_BASE_URL}/mail/sendgrid`,
  MAIL_PUBLIC_API: `${API_BASE_URL}/mail/public-api`,
};
```

### **🔒 Headers de Autenticación**
```typescript
export const getAuthHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});
```

## 📝 Tipos TypeScript

### **👤 Usuario**
```typescript
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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  CUSTOMER = 'customer',
  MODERATOR = 'moderator',
}
```

### **📦 Producto**
```typescript
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
```

### **🛒 Carrito y Órdenes**
```typescript
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
```

### **🔐 Autenticación**
```typescript
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

export interface AuthResponse {
  user: User;
  access_token: string;
  message?: string;
}
```

### **📊 Administración**
```typescript
export interface AdminStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalUsers: number;
  totalOrders: number;
}

export interface Payment {
  _id?: string;
  amount: number;
  method: string;
  date: string;
}

export interface Shipment {
  _id?: string;
  address: string;
  status: string;
  date: string;
}
```

## 🧩 Componentes Principales

### **🎨 Layout Components**

#### **Header.tsx**
- Navegación principal
- Logo NBA
- Menú de usuario
- Carrito de compras
- Búsqueda de productos

#### **Footer.tsx**
- Enlaces importantes
- Información de contacto
- Redes sociales
- Copyright

### **🏠 Home Components**

#### **HomePage.tsx**
- Página de inicio principal
- Integra HeroSection y FeaturedProducts

#### **HeroSection.tsx**
- Banner principal
- Call-to-action
- Imágenes destacadas

#### **FeaturedProducts.tsx**
- Productos destacados
- Grid responsive
- Enlaces a productos

### **📦 Product Components**

#### **ProductGrid.tsx**
- Lista de productos en grid
- Paginación
- Responsive design

#### **ProductCard.tsx**
- Tarjeta individual de producto
- Imagen, precio, descripción
- Botón agregar al carrito

#### **ProductModal.tsx**
- Vista detallada del producto
- Galería de imágenes
- Opciones de compra

### **🛒 Cart Components**

#### **CartModal.tsx**
- Vista del carrito
- Lista de productos
- Totales y subtotales
- Botón checkout

### **💳 Checkout Components**

#### **CheckoutModal.tsx**
- Proceso de compra
- Formulario de envío
- Método de pago
- Confirmación de orden

### **🔐 Auth Components**

#### **AuthModal.tsx**
- Login y registro
- Validación de formularios
- Manejo de errores

### **🔍 Filter Components**

#### **FilterSidebar.tsx**
- Filtros por categoría
- Filtros por marca
- Rango de precios
- Búsqueda por texto

### **👑 Admin Components**

#### **AdminDashboard.tsx**
- Panel principal de administración
- Estadísticas generales
- Navegación entre secciones

#### **ProductsManagement.tsx**
- CRUD de productos
- Lista de productos
- Formulario de edición

#### **UsersManagement.tsx**
- Gestión de usuarios
- Roles y permisos
- Búsqueda y filtros

#### **CategoriesManagement.tsx & BrandsManagement.tsx**
- Gestión de categorías y marcas
- CRUD completo

#### **OrdersManagement.tsx**
- Gestión de órdenes
- Estados de órdenes
- Detalles de compra

## 🔧 Servicios

### **🔐 AuthService**
```typescript
class AuthService {
  // Almacenamiento local
  private static TOKEN_KEY = 'nba_store_token';
  private static USER_KEY = 'nba_store_user';
  
  // Métodos principales
  static async login(credentials: LoginCredentials): Promise<AuthResponse>
  static async register(userData: RegisterData): Promise<AuthResponse>
  static logout(): void
  static getToken(): string | null
  static getUser(): User | null
  static async getCurrentUser(): Promise<User | null>
}
```

### **📦 ProductService**
```typescript
class ProductService {
  static async getProducts(): Promise<Product[]>
  static async getProductById(id: string): Promise<Product>
  static async getCategories(): Promise<Category[]>
  static async getBrands(): Promise<Brand[]>
  static async createProduct(product: Partial<Product>): Promise<Product>
  static async updateProduct(id: string, product: Partial<Product>): Promise<Product>
  static async deleteProduct(id: string): Promise<void>
}
```

### **📋 OrderService**
```typescript
class OrderService {
  static async createOrder(orderData: CreateOrderData): Promise<Order>
  static async getOrders(): Promise<Order[]>
  static async getOrderById(id: string): Promise<Order>
  static async updateOrderStatus(id: string, status: string): Promise<Order>
}
```

### **💳 PaymentService & 🚚 ShipmentService**
```typescript
class PaymentService {
  static async getPayments(): Promise<Payment[]>
  static async createPayment(payment: Payment): Promise<Payment>
  static async updatePayment(id: string, payment: Payment): Promise<Payment>
  static async deletePayment(id: string): Promise<void>
}

class ShipmentService {
  static async getShipments(): Promise<Shipment[]>
  static async createShipment(shipment: Shipment): Promise<Shipment>
  static async updateShipment(id: string, shipment: Shipment): Promise<Shipment>
  static async deleteShipment(id: string): Promise<void>
}
```

### **👑 AdminService**
```typescript
class AdminService {
  static async getStats(): Promise<AdminStats>
  static async getUsers(): Promise<User[]>
  static async updateUserRole(userId: string, role: UserRole): Promise<User>
  static async deleteUser(userId: string): Promise<void>
}
```

## 🏪 Contextos

### **🔐 AuthContext Implementation**
```typescript
// Estado inicial
const [user, setUser] = useState<User | null>(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);

// Inicialización automática
useEffect(() => {
  const initializeAuth = async () => {
    const token = AuthService.getToken();
    if (token) {
      const userData = AuthService.getUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  };
  initializeAuth();
}, []);

// Métodos del contexto
const login = async (credentials: LoginCredentials) => { /* ... */ };
const register = async (userData: RegisterData) => { /* ... */ };
const logout = () => { /* ... */ };
const refreshUser = async () => { /* ... */ };
```

### **🛒 CartContext Implementation**
```typescript
// Estado del carrito
const [items, setItems] = useState<CartItem[]>([]);

// Persistencia en localStorage
useEffect(() => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (savedCart) {
    setItems(JSON.parse(savedCart));
  }
}, []);

useEffect(() => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}, [items]);

// Métodos del carrito
const addItem = (product: Product, quantity = 1) => { /* ... */ };
const removeItem = (productId: string) => { /* ... */ };
const updateQuantity = (productId: string, quantity: number) => { /* ... */ };
const clearCart = () => { /* ... */ };

// Cálculos automáticos
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

## 🚀 Instalación y Configuración

### **📋 Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Git

### **⚡ Instalación Rápida**
```bash
# Clonar repositorio
git clone [URL_REPOSITORIO]
cd nba-e-commerce

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### **🔧 Configuración de Entorno**
```bash
# Variables de entorno (opcional)
VITE_API_BASE_URL=https://tienda_nba_app-api.desarrollo-software.xyz
VITE_APP_NAME=NBA Store
```

### **🎯 Configuración de Proxy (Vite)**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tienda_nba_app-api.desarrollo-software.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
      }
    }
  }
})
```

## 📜 Scripts Disponibles

```bash
# 🚀 Desarrollo
npm run dev          # Servidor desarrollo (localhost:5173)

# 🏗️ Producción
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción

# 🔍 Calidad de Código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores automáticamente

# 🧹 Mantenimiento
npm run clean        # Limpiar cache y dist
npm audit            # Revisar vulnerabilidades
npm update           # Actualizar dependencias
```

## ✨ Funcionalidades

### **🛍️ E-commerce Core**
- ✅ **Catálogo de Productos**: Grid responsive con productos NBA
- ✅ **Carrito de Compras**: Persistente con localStorage
- ✅ **Proceso de Checkout**: Formulario completo de compra
- ✅ **Gestión de Órdenes**: Historial y seguimiento
- ✅ **Sistema de Pagos**: Integración con métodos de pago
- ✅ **Gestión de Envíos**: Direcciones y seguimiento

### **👤 Gestión de Usuarios**
- ✅ **Autenticación JWT**: Login/Register seguro
- ✅ **Perfiles de Usuario**: Información personal
- ✅ **Roles y Permisos**: Admin/User/Customer/Moderator
- ✅ **Sesiones Persistentes**: Auto-login con tokens

### **🔍 Búsqueda y Filtros**
- ✅ **Búsqueda por Texto**: Nombre y descripción
- ✅ **Filtros por Categoría**: Jerseys, zapatos, accesorios
- ✅ **Filtros por Marca**: Teams oficiales NBA
- ✅ **Rango de Precios**: Slider personalizable
- ✅ **Combinación de Filtros**: Múltiples filtros simultáneos

### **📱 UX/UI Avanzado**
- ✅ **Diseño Responsive**: Mobile-first design
- ✅ **Animaciones Fluidas**: Framer Motion
- ✅ **Notificaciones Toast**: Feedback inmediato
- ✅ **Modales Elegantes**: Overlays no intrusivos
- ✅ **Loading States**: Indicadores de carga
- ✅ **Error Handling**: Manejo graceful de errores

### **👑 Panel de Administración**
- ✅ **Dashboard Estadísticas**: Métricas generales
- ✅ **CRUD Productos**: Crear/Leer/Actualizar/Eliminar
- ✅ **Gestión Usuarios**: Roles y permisos
- ✅ **Gestión Categorías/Marcas**: Organización de catálogo
- ✅ **Gestión Órdenes**: Estados y seguimiento
- ✅ **Gestión Pagos/Envíos**: Procesamiento completo

### **🎨 Temática NBA**
- ✅ **Branding Oficial**: Logos y colores NBA
- ✅ **Productos Auténticos**: Jerseys, zapatos, accesorios
- ✅ **Teams Integration**: Lakers, Bulls, y más
- ✅ **Imágenes de Calidad**: Assets optimizados

## 🎯 Estructura de Archivos Detallada

### **📁 /src/components/Admin/**
```
AdminDashboard.tsx     # Panel principal con estadísticas
├── Cards estadísticas con iconos Lucide
├── Navegación entre secciones
├── Gráficos y métricas
└── Enlaces rápidos

BrandsManagement.tsx   # Gestión de marcas
├── Lista de marcas (Lakers, Bulls, etc.)
├── Formulario crear/editar marca
├── Búsqueda y filtros
└── Acciones CRUD

CategoriesManagement.tsx # Gestión de categorías
├── Lista de categorías (Jerseys, Shoes, etc.)
├── Formulario crear/editar categoría
├── Jerarquía de categorías
└── Acciones CRUD

ProductForm.tsx        # Formulario productos
├── Campos validados con Yup
├── Upload de imágenes
├── Selección categoría/marca
└── Estados de stock

ProductsManagement.tsx # Gestión de productos
├── Tabla con paginación
├── Filtros avanzados
├── Vista previa productos
└── Acciones masivas

UsersManagement.tsx    # Gestión de usuarios
├── Lista de usuarios
├── Asignación de roles
├── Búsqueda por email/username
└── Suspender/activar usuarios

PaymentsManagement.tsx # Gestión de pagos
├── Lista de transacciones
├── Estados de pago
├── Filtros por fecha/método
└── Detalles de pago

ShipmentsManagement.tsx # Gestión de envíos
├── Lista de envíos
├── Estados de entrega
├── Tracking de paquetes
└── Direcciones de envío
```

### **📁 /src/components/Auth/**
```
AuthModal.tsx          # Modal autenticación
├── Tabs Login/Register
├── Formularios validados
├── Manejo de errores
├── Loading states
└── Integración con AuthContext
```

### **📁 /src/components/Cart/**
```
CartModal.tsx          # Modal del carrito
├── Lista de productos agregados
├── Controles cantidad (+/-)
├── Cálculo de totales
├── Botón proceder a checkout
├── Imágenes de productos
└── Formateo de precios
```

### **📁 /src/components/Checkout/**
```
CheckoutModal.tsx      # Proceso de compra
├── Formulario datos de envío
├── Selección método de pago
├── Resumen de orden
├── Validación de campos
├── Integración con OrderService
└── Confirmación de compra
```

### **📁 /src/components/Filters/**
```
FilterSidebar.tsx      # Sidebar de filtros
├── Búsqueda por texto
├── Filtro por categorías
├── Filtro por marcas
├── Slider rango de precios
├── Botón limpiar filtros
└── Contador de resultados
```

### **📁 /src/components/Home/**
```
HomePage.tsx           # Página principal
├── Integración de componentes
├── Layout responsive
└── SEO optimizado

HeroSection.tsx        # Banner principal
├── Imagen hero NBA
├── Texto promocional
├── Call-to-action button
├── Animaciones Framer Motion
└── Responsive design

FeaturedProducts.tsx   # Productos destacados
├── Grid de productos seleccionados
├── Lazy loading imágenes
├── Hover effects
└── Enlaces a productos
```

### **📁 /src/components/Layout/**
```
Header.tsx             # Navegación superior
├── Logo NBA animado
├── Menú de navegación
├── Barra de búsqueda
├── Carrito con contador
├── Menú de usuario
├── Botones login/logout
└── Mobile hamburger menu

Footer.tsx             # Pie de página
├── Enlaces importantes
├── Información de contacto
├── Redes sociales
├── Copyright
└── Links legales
```

### **📁 /src/components/Product/**
```
ProductCard.tsx        # Tarjeta de producto
├── Imagen producto
├── Nombre y descripción
├── Precio formateado
├── Stock disponible
├── Botón agregar carrito
├── Hover effects
└── Loading placeholder

ProductGrid.tsx        # Grilla de productos
├── Layout responsive (1-4 columnas)
├── Infinite scroll/paginación
├── Empty states
├── Loading skeletons
└── Filtros aplicados

ProductModal.tsx       # Vista detallada
├── Galería de imágenes
├── Información completa
├── Selector de cantidad
├── Botón agregar carrito
├── Productos relacionados
└── Reviews/ratings
```

### **📁 /src/services/**
```
authService.ts         # Servicio autenticación
├── login(credentials)
├── register(userData)
├── logout()
├── getToken() / setToken()
├── getUser() / setUser()
├── getCurrentUser()
└── Token refresh automático

productService.ts      # Servicio productos
├── getProducts()
├── getProductById(id)
├── getCategories()
├── getBrands()
├── createProduct(data)
├── updateProduct(id, data)
├── deleteProduct(id)
└── searchProducts(query)

orderService.ts        # Servicio órdenes
├── createOrder(orderData)
├── getOrders()
├── getOrderById(id)
├── updateOrderStatus(id, status)
├── cancelOrder(id)
└── getOrderHistory(userId)

paymentService.ts      # Servicio pagos
├── getPayments()
├── createPayment(data)
├── updatePayment(id, data)
├── deletePayment(id)
├── processPayment(data)
└── getPaymentMethods()

shipmentService.ts     # Servicio envíos
├── getShipments()
├── createShipment(data)
├── updateShipment(id, data)
├── deleteShipment(id)
├── trackShipment(id)
└── getShippingMethods()

adminService.ts        # Servicio administración
├── getStats()
├── getUsers()
├── updateUserRole(userId, role)
├── deleteUser(userId)
├── getUserById(id)
└── searchUsers(query)
```

### **📁 /src/context/**
```
AuthContext.tsx        # Contexto autenticación
├── Estado: user, isAuthenticated, isLoading
├── Métodos: login, register, logout, refreshUser
├── Auto-inicialización desde localStorage
├── Manejo de errores
└── Persistencia de sesión

CartContext.tsx        # Contexto carrito
├── Estado: items, totalItems, totalAmount
├── Métodos: addItem, removeItem, updateQuantity, clearCart
├── Persistencia en localStorage
├── Cálculos automáticos
├── Validaciones de stock
└── Eventos de carrito
```

### **📁 /src/types/**
```
index.ts               # Definiciones TypeScript
├── User interface y UserRole enum
├── Product, Category, Brand interfaces
├── CartItem y Order interfaces
├── LoginCredentials y RegisterData
├── AuthResponse y ApiResponse
├── AdminStats interface
├── Payment y Shipment interfaces
└── Utility types y helpers
```

### **📁 /src/config/**
```
api.ts                 # Configuración API
├── API_BASE_URL constante
├── API_ENDPOINTS objeto con todas las rutas
├── HTTP_METHODS constantes
├── getAuthHeaders() función
├── Error handling utilities
└── Request/Response interceptors
```

---

## 🎯 Próximas Funcionalidades

### **🚀 Versión 2.0**
- [ ] **PWA Support**: Aplicación web progresiva
- [ ] **Push Notifications**: Notificaciones de ofertas
- [ ] **Wishlist**: Lista de deseos
- [ ] **Product Reviews**: Sistema de reseñas
- [ ] **Social Login**: Login con Google/Facebook
- [ ] **Multi-idioma**: Internacionalización
- [ ] **Dark Mode**: Tema oscuro
- [ ] **Analytics**: Integración con Google Analytics

### **💳 Mejoras de Pago**
- [ ] **Stripe Integration**: Pagos con tarjeta
- [ ] **PayPal Integration**: Pagos con PayPal
- [ ] **Wallet Support**: Apple Pay, Google Pay
- [ ] **Cryptocurrency**: Pagos con crypto

### **📱 Mobile**
- [ ] **React Native App**: Aplicación móvil nativa
- [ ] **App Store**: Publicación en stores
- [ ] **Push Notifications**: Notificaciones móviles

---

## 🤝 Contribución

### **📋 Guías de Contribución**
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **📝 Estándares de Código**
- **TypeScript**: Tipado estricto obligatorio
- **ESLint**: Seguir configuración del proyecto
- **Prettier**: Formateo automático
- **Naming Conventions**: camelCase para variables, PascalCase para componentes
- **Component Structure**: Functional components con hooks
- **File Organization**: Un componente por archivo

### **🧪 Testing**
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress
- **Coverage**: Mínimo 80%

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📞 Contacto y Soporte

- **Desarrollador**: [Isaac Torres]
- **Email**: [i3080135@gmail.com]
- **GitHub**: [https://github.com/IsaacT30]
- **Demo Live**: [https://nba-store-demo.com]

---

**🏀 ¡Gracias por usar NBA E-Commerce! 🏆**
