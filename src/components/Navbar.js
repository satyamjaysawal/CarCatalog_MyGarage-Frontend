import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { searchCars } from '../services/api'; // Import the search API function

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await searchCars(searchTerm, token);
        // Pass the response data to the search results page or display it as needed
        navigate('/search', { state: { results: response.data } });
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      <div>
        <Link to="/" className="text-2xl font-bold hover:text-blue-300 transition-all">Car Management</Link>
      </div>
      <div className="flex items-center space-x-6">
        {token ? (
          <>
            <Link to="/" className="text-lg hover:text-blue-300 transition-all">Car List</Link>
            <Link to="/add-car" className="text-lg hover:text-blue-300 transition-all">Add Car</Link>
            <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cars..."
                className="px-3 py-2 w-48 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              >
                Search
              </button>
            </form>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="text-lg hover:text-blue-300 transition-all">Register</Link>
            <Link to="/login" className="text-lg hover:text-blue-300 transition-all">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
