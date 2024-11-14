import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  if (results.length === 0) return <p>No results found for the given search term.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map(car => (
          <div key={car._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Display car image if available */}
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
            <Link to={`/cars/${car._id}`} className="text-blue-600 hover:text-blue-800 underline font-medium">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
