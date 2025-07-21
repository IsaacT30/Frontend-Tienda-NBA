import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logoNBA from '../../assets/logos/ll.jpg';

interface HeaderProps {
  onCartClick: () => void;
  onLoginClick: () => void;
  onSearchChange: (query: string) => void;
  onLogoClick?: () => void;
  onShopClick?: () => void;
  onTeamsClick?: () => void;
  onPlayersClick?: () => void;
  onOffersClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onCartClick,
  onLoginClick,
  onSearchChange,
  onLogoClick,
  onShopClick,
  onTeamsClick,
  onPlayersClick,
  onOffersClick
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <img
              src={logoNBA}
              alt="NBA Store"
              className="cursor-pointer hover:scale-105 transition-transform h-16 w-auto drop-shadow-xl"
              onClick={onLogoClick}
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex ml-8 space-x-6">
            <button
              onClick={onShopClick}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Catálogo
            </button>
            <button
              onClick={onTeamsClick}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Equipos
            </button>
            <button
              onClick={onPlayersClick}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Jugadores
            </button>
            <button
              onClick={onOffersClick}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Beneficios
            </button>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">
                    {user?.first_name || user?.username}
                  </span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {/* Cart */}
            <button
              onClick={() => {
                onCartClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
              </div>
              {totalItems > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-gray-600">
                  Bienvenidos, {user?.first_name || user?.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  Cerrar Sesion
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                Iniciar Sesion
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



