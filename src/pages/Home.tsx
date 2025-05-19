import React, { useState, useEffect } from 'react';
import { useBooking, Service } from '../context/BookingContext';
import BookingCard from '../components/BookingCard';
import ServiceFilter from '../components/ServiceFilter';
import { Search, Calendar, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/ui/spotlight';

const Home: React.FC = () => {
  const { services } = useBooking();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let result = services;
    
    if (selectedCategory !== 'all') {
      result = result.filter(service => service.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        service => 
          service.name.toLowerCase().includes(term) || 
          service.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredServices(result);
  }, [services, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 py-24 relative"
        >
          <div className="max-w-5xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Find Your Perfect
              <span className="block text-primary-400 mt-2">Space</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Discover and book premium spaces for meetings, events, and work. Your ideal venue is just a click away.
            </motion.p>
            
            <Spotlight className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for spaces..."
                className="w-full pl-12 pr-4 py-4 bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Spotlight>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Spotlight className="rounded-xl p-6 bg-dark-900/50 backdrop-blur-sm border border-dark-800">
                  <Calendar className="h-8 w-8 text-primary-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Real-time Booking</h3>
                  <p className="text-gray-400">Instant confirmation for your reservations</p>
                </Spotlight>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Spotlight className="rounded-xl p-6 bg-dark-900/50 backdrop-blur-sm border border-dark-800">
                  <CheckCircle className="h-8 w-8 text-primary-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Verified Spaces</h3>
                  <p className="text-gray-400">Quality assured professional environments</p>
                </Spotlight>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Spotlight className="rounded-xl p-6 bg-dark-900/50 backdrop-blur-sm border border-dark-800">
                  <Clock className="h-8 w-8 text-primary-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Flexible Duration</h3>
                  <p className="text-gray-400">Book by the hour or full day</p>
                </Spotlight>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-3">Available Spaces</h2>
          <p className="text-gray-400 text-lg">Find the perfect space for your needs</p>
        </motion.div>
        
        <ServiceFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        />
        
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <BookingCard key={service.id} service={service} index={index} />
            ))}
          </div>
        ) : (
          <Spotlight className="rounded-xl text-center py-12 bg-dark-900/50 backdrop-blur-sm border border-dark-800">
            <p className="text-gray-400 mb-4">No spaces found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Reset Filters
            </button>
          </Spotlight>
        )}
      </section>
    </div>
  );
};

export default Home;