import React, { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import FormToggle from '../components/FormToggle';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg transition-all duration-300">
        {/* <h1 className="text-3xl font-bold text-center text-black mb-8">
          {isLogin ? 'Bienvenido de Nuevo' : 'Crear Cuenta'}
        </h1> */}

        {isLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}

        <FormToggle 
          isLogin={isLogin} 
          toggleAuthMode={toggleAuthMode} 
        />
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
