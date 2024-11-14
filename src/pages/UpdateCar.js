import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById, updateCar } from '../services/api';
import AuthContext from '../context/AuthContext';

const UpdateCar = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState({ title: '', description: '', tags: '', images: '' });
  const [loading, setLoading] = useState(true);  // Loading state for the form
  const [error, setError] = useState(null);  // Error state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);  // Button disable state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarById(id, token);
        setCar({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags.join(', '),
          images: response.data.images.join(', ')
        });
      } catch (error) {
        setError('Failed to fetch car details. Please try again later.');
        console.error('Failed to fetch car details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, token]);

  const handleChange = (e) => setCar({ ...car, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!car.title || !car.description || !car.tags || !car.images) {
      setError('Please fill in all fields.');
      return;
    }

    const updatedCarData = {
      ...car,
      tags: car.tags.split(',').map(tag => tag.trim()),
      images: car.images.split(',').map(image => image.trim())
    };

    try {
      setIsSubmitting(true);
      await updateCar(id, updatedCarData, token);
      navigate(`/cars/${id}`);  // Redirect to the car details page after update
    } catch (error) {
      setError('Failed to update car. Please try again later.');
      console.error('Failed to update car:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center text-xl">Loading car details...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Car</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
          <input
            id="title"
            name="title"
            value={car.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={car.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-semibold mb-2">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            value={car.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tags"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-lg font-semibold mb-2">Images (comma separated URLs)</label>
          <input
            id="images"
            name="images"
            value={car.images}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Image URLs"
          />
        </div>

        {/* Image Preview */}
        {car.images && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
            <div className="flex flex-wrap gap-2">
              {car.images.split(',').map((image, index) => (
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
          {isSubmitting ? 'Updating...' : 'Update Car'}
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
