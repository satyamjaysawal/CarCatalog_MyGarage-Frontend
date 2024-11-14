import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById, deleteCar } from '../services/api';
import AuthContext from '../context/AuthContext';

const CarDetail = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for better UX
  const [error, setError] = useState(null);  // Error state to handle API failures
  const [isDeleting, setIsDeleting] = useState(false);  // State to manage deletion process
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarById(id, token);
        setCar(response.data);
      } catch (error) {
        setError('Failed to fetch car details. Please try again later.');
        console.error('Failed to fetch car details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, token]);

  // Function to handle car deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (confirmDelete) {
      try {
        await deleteCar(id, token);
        navigate('/'); // Navigate back to CarList page after deletion
      } catch (error) {
        setError('Failed to delete car. Please try again later.');
        console.error('Failed to delete car:', error);
      } finally {
        setIsDeleting(false);
      }
    } else {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="text-center text-xl">Loading car details...</div>;
  if (error) return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-blue-600">{car.title}</h2>
        <p className="text-lg text-gray-700 mb-4">{car.description}</p>
        
        <h3 className="text-2xl font-semibold mb-2">Tags</h3>
        <ul className="list-disc pl-6 mb-4">
          {car.tags.map((tag, index) => (
            <li key={index} className="text-gray-700">{tag}</li>
          ))}
        </ul>
        
        <h3 className="text-2xl font-semibold mb-2">Images</h3>
        <div className="flex flex-wrap justify-start gap-4">
          {car.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Car Image ${index + 1}`}
              className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 p-2 rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Edit and Delete Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => navigate(`/update-car/${car._id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none transition-all duration-300"
          >
            Edit Car
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting} // Disable button while deleting
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-all duration-300 ${isDeleting && 'opacity-50 cursor-not-allowed'}`}
          >
            {isDeleting ? 'Deleting...' : 'Delete Car'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
