import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '../context/BookingContext';

type BookingCardProps = {
  service: Service;
};

const BookingCard: React.FC<BookingCardProps> = ({ service }) => {
  return (
    <div className="group relative">
      <div className="absolute inset-0 spotlight-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative card-gradient rounded-lg border border-dark-800 overflow-hidden transition-transform duration-300 hover:-translate-y-1">
        <div className="h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-dark-50">{service.name}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-900/50 text-primary-200 border border-primary-700/30">
              {service.category}
            </span>
          </div>
          <p className="text-dark-300 mb-4 line-clamp-2">{service.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-dark-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>{service.duration} min</span>
            </div>
            <div className="flex items-center font-medium text-primary-400">
              <DollarSign className="h-4 w-4 mr-0.5" />
              <span>{service.price}</span>
            </div>
          </div>
          <Link
            to={`/booking/${service.id}`}
            className="block w-full text-center py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;