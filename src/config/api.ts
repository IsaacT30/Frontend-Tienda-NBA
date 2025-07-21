const API_BASE_URL = 'https://tienda_nba_app-api.desarrollo-software.xyz';

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  
  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}`,
  USER_PROFILE: (id: string) => `${API_BASE_URL}/users/${id}/profile`,
  
  // Products
  PRODUCTOS: `${API_BASE_URL}/productos`,
  PRODUCTO_BY_ID: (id: string) => `${API_BASE_URL}/productos/${id}`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id: string) => `${API_BASE_URL}/categories/${id}`,
  
  // Brands
  MARCAS: `${API_BASE_URL}/marcas`,
  MARCA_BY_ID: (id: string) => `${API_BASE_URL}/marcas/${id}`,
  
  // Articles
  ARTICULOS: `${API_BASE_URL}/articulos`,
  ARTICULO_BY_ID: (id: string) => `${API_BASE_URL}/articulos/${id}`,
  
  // Orders
  ORDENES: `${API_BASE_URL}/ordenes`,
  ORDEN_BY_ID: (id: string) => `${API_BASE_URL}/ordenes/${id}`,
  
  // Posts
  POSTS: `${API_BASE_URL}/posts`,
  POST_BY_ID: (id: string) => `${API_BASE_URL}/posts/${id}`,

  // Payments
  PAGOS: `${API_BASE_URL}/pagos`,
  PAGO_BY_ID: (id: string) => `${API_BASE_URL}/pagos/${id}`,

  // Shipments
  ENVIOS: `${API_BASE_URL}/envios`,
  ENVIO_BY_ID: (id: string) => `${API_BASE_URL}/envios/${id}`,
  
  // Mail
  MAIL_GMAIL: `${API_BASE_URL}/mail/gmail`,
  MAIL_SENDGRID: `${API_BASE_URL}/mail/sendgrid`,
  MAIL_PUBLIC_API: `${API_BASE_URL}/mail/public-api`,
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;



export const getAuthHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

