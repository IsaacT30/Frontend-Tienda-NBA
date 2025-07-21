import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import ProductPage from '../pages/Private/ProductPage';
import OrderPage from '../pages/Private/OrderPage';
import CategoryPage from '../pages/Private/CategoryPage';

const PrivateRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<AdminDashboard />} />
    <Route path="/products" element={<ProductPage />} />
    <Route path="/orders" element={<OrderPage />} />
    <Route path="/categories" element={<CategoryPage />} />
  </Routes>
);

export default PrivateRoutes;
