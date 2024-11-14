import React, { useState, useEffect, useContext } from 'react';
import { getCars } from '../services/api';
import AuthContext from '../context/AuthContext';

const CarList = () => {
  const { token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars(token);
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchCars();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Car Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map(car => (
          <div
            key={car._id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {/* Car Image */}
            {car.images && car.images.length > 0 ? (
              <img
                src={car.images[0]}  // Display the first image in the array
                alt={`${car.title} image`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
            <p className="text-gray-500 mb-4">{car.description}</p>
            <a
              href={`/cars/${car._id}`}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
