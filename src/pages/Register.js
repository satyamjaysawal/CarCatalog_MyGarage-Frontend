// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); // Success state
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError(''); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      await register(form);
      setSuccess('Registration successful! You can now log in.'); // Success message
      setTimeout(() => navigate('/login'), 2000); // Redirect after success message
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your information and try again.'); // Error message
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        
        <input
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          value={form.password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
