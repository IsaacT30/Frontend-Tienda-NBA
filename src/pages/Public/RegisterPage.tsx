import React from 'react';
import AuthModal from '../../components/Auth/AuthModal';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <AuthModal isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default RegisterPage;
