import React from 'react';
import { useBooking } from '../context/BookingContext';

type ServiceFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const ServiceFilter: React.FC<ServiceFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const { services } = useBooking();
  
  // Extract unique categories from services
  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilter;