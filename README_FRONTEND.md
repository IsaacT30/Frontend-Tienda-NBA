# 🏀 NBA E-Commerce Frontend

## 📋 Índice
- Descripción General
- Estructura del Proyecto
- Tecnologías y Dependencias
- Arquitectura de la Aplicación
- Configuración de API
- Tipos TypeScript
- Componentes Principales
- Servicios
- Contextos
- Instalación y Configuración
- Scripts Disponibles
- Funcionalidades
- Estructura de Archivos Detallada

---

## 🏀 Descripción General

NBA E-Commerce es una aplicación web moderna de comercio electrónico especializada en productos oficiales de la NBA. Construida con React 18, TypeScript, Vite y Tailwind CSS, ofrece una experiencia de usuario fluida, rápida y moderna.

### Características Principales
- Catálogo completo de productos NBA
- Carrito de compras persistente
- Sistema de autenticación (login/register)
- Panel de administración robusto (CRUD productos, marcas, categorías, usuarios, envíos, pagos)
- Checkout integrado
- Filtros y búsqueda global
- Responsive y animaciones modernas

---

## 🏗️ Estructura del Proyecto

```
nba-e-commerce/
├── package.json              # Dependencias y scripts NPM
├── vite.config.ts            # Configuración Vite + Proxy API
├── tsconfig.json             # Configuración TypeScript base
├── tailwind.config.js        # Configuración Tailwind CSS
├── postcss.config.js         # Configuración PostCSS
├── index.html                # HTML principal
│
├── public/                   # Archivos públicos (imágenes, logos)
│
├── src/
│   ├── main.tsx              # Punto de entrada React
│   ├── App.tsx               # Componente raíz
│   ├── index.css             # Estilos globales + Tailwind
│   ├── assets/logos/         # Recursos estáticos (logos, imágenes)
│   │
│   ├── components/
│   │   ├── Admin/            # Panel administración (dashboard, CRUD)
│   │   ├── Auth/             # Autenticación (modales)
│   │   ├── Cart/             # Carrito de compras
│   │   ├── Checkout/         # Proceso de compra
│   │   ├── Filters/          # Filtros de productos
│   │   ├── Home/             # Página principal
│   │   ├── Layout/           # Header, Footer, navegación
│   │   └── Product/          # Tarjetas, grillas y modales de productos
│   │
│   ├── config/               # Configuración de endpoints API
│   ├── context/              # Contextos globales (auth, carrito)
│   ├── services/             # Servicios API (productos, auth, admin, pagos, envíos)
│   └── types/                # Definiciones TypeScript
```

---

## 🛠️ Tecnologías y Dependencias

- **React 18** y **TypeScript** (SPA moderna y tipada)
- **Vite** (build ultra rápido)
- **Tailwind CSS** (estilos utility-first)
- **Framer Motion** (animaciones)
- **Lucide React** (iconos)
- **React Router DOM** (ruteo SPA)
- **React Hook Form** + **Yup** (formularios y validación)
- **Axios** (peticiones HTTP)
- **React Hot Toast** (notificaciones)
- **ESLint** (linting y calidad de código)

---

## 🧩 Componentes Principales

- **Admin/**: Dashboard, gestión de productos, marcas, categorías, usuarios, pagos, envíos.
- **Auth/**: Modal de login/registro.
- **Cart/**: Modal de carrito de compras.
- **Checkout/**: Modal de checkout.
- **Filters/**: Sidebar de filtros.
- **Home/**: Hero, productos destacados, página principal.
- **Layout/**: Header, Footer.
- **Product/**: ProductCard, ProductGrid, ProductModal.

---

## 🔧 Servicios

- **adminService.ts**: CRUD de productos, marcas, categorías, usuarios, pagos, envíos.
- **authService.ts**: Login, registro, autenticación JWT.
- **orderService.ts**: Gestión de órdenes.
- **paymentService.ts**: Procesamiento de pagos.
- **productService.ts**: CRUD de productos.
- **shipmentService.ts**: Gestión de envíos.

---

## 🏪 Contextos

- **AuthContext.tsx**: Estado global de autenticación.
- **CartContext.tsx**: Estado global del carrito.

---

## 🚀 Instalación y Configuración

1. Clona el repositorio.
2. Instala dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` y configura la variable `VITE_API_BASE_URL` con la URL de tu backend.
4. Inicia el proyecto:
   ```
   npm run dev
   ```

---

## 📦 Scripts Disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Compila la app para producción.
- `npm run preview` — Previsualiza la app de producción.
- `npm run lint` — Linting del código.

---

## 🛒 Funcionalidades

- Catálogo y búsqueda global de productos
- Carrito de compras persistente
- Checkout y pagos
- Panel de administración completo (CRUD)
- Gestión de usuarios, marcas, categorías, envíos y pagos
- Responsive y animaciones modernas

---

## 📁 Estructura de Archivos Detallada

Consulta el README original o la estructura de carpetas para más detalles sobre cada archivo y carpeta.

---

¿Dudas? ¡Revisa el código fuente y los comentarios para más detalles!
