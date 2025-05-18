import React, { useState, useEffect } from 'react';
import { useBooking, Service } from '../context/BookingContext';
import BookingCard from '../components/BookingCard';
import ServiceFilter from '../components/ServiceFilter';
import { Search, Calendar, CheckCircle, Clock } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-10 spotlight-effect"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black pointer-events-none"></div>
        
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-primary-400 mt-2">Space</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover and book premium spaces for meetings, events, and work. Your ideal venue is just a click away.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="card-spotlight rounded-xl p-6">
                <Calendar className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Booking</h3>
                <p className="text-gray-400">Instant confirmation for your reservations</p>
              </div>
              <div className="card-spotlight rounded-xl p-6">
                <CheckCircle className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Verified Spaces</h3>
                <p className="text-gray-400">Quality assured professional environments</p>
              </div>
              <div className="card-spotlight rounded-xl p-6">
                <Clock className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Flexible Duration</h3>
                <p className="text-gray-400">Book by the hour or full day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-3">Available Spaces</h2>
          <p className="text-gray-400 text-lg">Find the perfect space for your needs</p>
        </div>
        
        <ServiceFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        />
        
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <BookingCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="card-spotlight rounded-xl text-center py-12">
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
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;