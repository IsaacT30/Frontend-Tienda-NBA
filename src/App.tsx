import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { AuthService } from './services/authService';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './components/Home/HomePage';
import ProductModal from './components/Product/ProductModal';
import AuthModal from './components/Auth/AuthModal';
import CartModal from './components/Cart/CartModal';
import CheckoutModal from './components/Checkout/CheckoutModal';
import { Product, Category, Brand } from './types';
import { ProductService } from './services/productService';
import StorePage from './components/StorePage';
import TeamsPage from './components/TeamsPage';
import PlayersPage from './components/PlayersPage';
import OffersPage from './components/OffersPage';




function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Eliminar currentView, usaremos rutas

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          ProductService.getProducts(),
          ProductService.getCategories(),
          ProductService.getBrands(),
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoria?.id === selectedCategory);
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.marca?.id === selectedBrand);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      parseFloat(product.precio) >= priceRange[0] && parseFloat(product.precio) <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 1000]);
    setSearchQuery('');
  };

  const handleCheckoutComplete = () => {
    setIsCheckoutModalOpen(false);
    setIsCartModalOpen(false);
  };

  // Funciones de navegación para las páginas
  const goToHome = () => navigate('/');
  const goToStore = () => navigate('/tienda');
  const goToTeams = () => navigate('/equipos');
  const goToPlayers = () => navigate('/jugadores');
  const goToOffers = () => navigate('/ofertas');

  // Check if user is admin
  const isAdmin = AuthService.isAdmin();

  // If user is admin, show private routes
  if (isAuthenticated && isAdmin) {
    return <PrivateRoutes />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setIsCartModalOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onSearchChange={setSearchQuery}
        onLogoClick={goToHome}
        onShopClick={goToStore}
        onTeamsClick={goToTeams}
        onPlayersClick={goToPlayers}
        onOffersClick={goToOffers}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tienda" element={<StorePage products={filteredProducts} isLoading={isLoading} onProductSelect={handleProductSelect} />} />
        <Route path="/equipos" element={<TeamsPage />} />
        <Route path="/jugadores" element={<PlayersPage />} />
        <Route path="/ofertas" element={<OffersPage />} />
      </Routes>

      <Footer />

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onCheckout={() => {
          setIsCartModalOpen(false);
          setIsCheckoutModalOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCheckoutComplete}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;