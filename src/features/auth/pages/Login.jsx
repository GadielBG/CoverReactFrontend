import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoginForm from '../components/LoginForm';
import { clearError } from '../../../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 max-w-md w-full space-y-8 p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 10h10M7 13h10" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bienvenido a Cover
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Panel de administración para discotecas
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <Link 
                to="/reset-password" 
                className="text-sm text-purple-600 hover:text-purple-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿No tienes cuenta?</span>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                to="/register" 
                className="inline-flex items-center px-4 py-2 border border-purple-600 text-sm font-medium rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
              >
                Registrar nueva discoteca
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-white text-sm opacity-75">
          <p>&copy; 2024 Cover. Sistema de gestión de discotecas.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;