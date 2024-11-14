// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); // Success state
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form);
      authLogin(response.data.token);
      setSuccess('Login successful! Redirecting...'); // Success message
      setError(''); // Clear any previous errors
      setTimeout(() => navigate('/'), 1000); // Redirect after success message
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.'); // Error message
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
