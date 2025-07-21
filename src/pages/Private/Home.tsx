
import React, { useState, useEffect } from 'react';
import {Package,Users,Tag,Award,ShoppingCart, TrendingUp,Settings,BarChart3} from 'lucide-react';
import { AdminStats } from '../../types';
import { AdminService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import ProductsManagement from '../../components/Admin/ProductsManagement';
import CategoriesManagement from '../../components/Admin/CategoriesManagement';
import BrandsManagement from '../../components/Admin/BrandsManagement';
import UsersManagement from '../../components/Admin/UsersManagement';
import PaymentsManagement from '../../components/Admin/PaymentsManagement';
import ShipmentsManagement from '../../components/Admin/ShipmentsManagement';

type AdminView = 'dashboard' | 'products' | 'categories' | 'brands' | 'users' | 'payments' | 'shipments';

const Home: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalBrands: 0,
    totalUsers: 0,
    totalOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) loadStats();
  }, [isAdmin]);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const adminStats = await AdminService.getAdminStats();
      setStats(adminStats);
    } catch (err) {
      setError('Failed to load admin stats. Please check your connection or login again.');
      console.error('Failed to load admin stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'brands', label: 'Brands', icon: Award },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: ShoppingCart },
    { id: 'shipments', label: 'Shipments', icon: TrendingUp },
  ];

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Brands',
      value: stats.totalBrands,
      icon: Award,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const renderContent = () => {
    if (!isAdmin) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
          <p className="text-gray-600 mt-2">Esta es tu vista privada de usuario.</p>
        </div>
      );
    }
    switch (currentView) {
      case 'products':
        return <ProductsManagement onStatsUpdate={loadStats} />;
      case 'categories':
        return <CategoriesManagement onStatsUpdate={loadStats} />;
      case 'brands':
        return <BrandsManagement onStatsUpdate={loadStats} />;
      case 'users':
        return <UsersManagement onStatsUpdate={loadStats} />;
      case 'payments':
        return <PaymentsManagement />;
      case 'shipments':
        return <ShipmentsManagement />;
      default:
        return (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded mb-4 font-semibold">
                {error}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción general del panel de control</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map((card) => {
                    const IconComponent = card.icon;
                    return (
                      <div key={card.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                          </div>
                          <div className={`p-3 rounded-full ${card.bgColor}`}>
                            <IconComponent className={`h-6 w-6 ${card.textColor}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setCurrentView('products')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Administrar productos</span>
                </button>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Tag className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Administrar categorías</span>
                </button>
                <button
                  onClick={() => setCurrentView('brands')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Gestionar marcas</span>
                </button>
                <button
                  onClick={() => setCurrentView('users')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">Administrar usuarios</span>
                </button>
                <button
                  onClick={() => setCurrentView('payments')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">Administrar pagos</span>
                </button>
                <button
                  onClick={() => setCurrentView('shipments')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span className="font-medium">Gestionar envíos</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isAdmin) {
    return renderContent();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Settings className="h-6 w-6 text-red-600" />
              <span>Admin Panel</span>
            </h1>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id as AdminView)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        currentView === item.id
                          ? 'bg-red-100 text-red-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-red-100 hover:text-red-700 font-medium"
                >
                  {/* Optionally use a logout icon here, or just text */}
                  <span>🔒</span>
                  <span>Cerrar sesión</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
