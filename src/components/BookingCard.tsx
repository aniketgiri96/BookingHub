import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from '../context/BookingContext';
import { Spotlight } from './ui/spotlight';

type BookingCardProps = {
  service: Service;
  index: number;
};

const BookingCard: React.FC<BookingCardProps> = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Spotlight className="rounded-xl bg-dark-900/50 backdrop-blur-sm border border-dark-800">
        <div className="h-48 overflow-hidden">
          <motion.img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-white">{service.name}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-900/50 text-primary-200 border border-primary-700/30">
              {service.category}
            </span>
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{service.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-400">
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
            className="block w-full text-center py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02]"
          >
            Book Now
          </Link>
        </div>
      </Spotlight>
    </motion.div>
  );
};

export default BookingCard;