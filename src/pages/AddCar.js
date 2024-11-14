import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/api';
import AuthContext from '../context/AuthContext';

const AddCar = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', description: '', tags: '', images: '' });
  const [error, setError] = useState(null);  // Error state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);  // Loading state for form submission
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.description || !form.tags || !form.images) {
      setError("All fields are required.");
      return;
    }

    const carData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      images: form.images.split(',').map(image => image.trim())
    };

    try {
      setIsSubmitting(true);
      await createCar(carData, token);
      navigate('/');
    } catch (error) {
      setError('Failed to add car. Please try again later.');
      console.error('Failed to add car:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add New Car</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Car Title"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Car Description"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-semibold mb-2">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-lg font-semibold mb-2">Images (comma separated URLs)</label>
          <input
            id="images"
            name="images"
            placeholder="Images (comma separated URLs)"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Preview */}
        {form.images && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
            <div className="flex flex-wrap gap-2">
              {form.images.split(',').map((image, index) => (
                <img
                  key={index}
                  src={image.trim()}
                  alt={`Car Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Adding...' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
