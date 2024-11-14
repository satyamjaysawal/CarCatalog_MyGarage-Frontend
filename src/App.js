// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CarDetail from './pages/CarDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import CarList from './pages/CarList';
import AddCar from './pages/AddCar'; 
import UpdateCar from './pages/UpdateCar'; 
import SearchResults from './pages/SearchResults';
const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/update-car/:id" element={<ProtectedRoute><UpdateCar /></ProtectedRoute>} />  {/* Add route for UpdateCar */}
          <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>
);

export default App;
