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

  // Add spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        hero.style.setProperty('--mouse-x', `${e.clientX}px`);
        hero.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      <section id="hero-section" className="relative overflow-hidden">
        <div className="absolute inset-0 spotlight-effect"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black pointer-events-none"></div>
        
        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Book Your Perfect Space
              <span className="block text-primary-400">With Confidence</span>
            </h1>
            <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto">
              Find and book premium meeting rooms, conference halls, and workspaces tailored to your needs.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-dark-400" />
              </div>
              <input
                type="text"
                placeholder="Search for spaces..."
                className="w-full pl-12 pr-4 py-4 bg-dark-900/50 backdrop-blur-sm border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-lg p-6">
                <Calendar className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Real-time Booking</h3>
                <p className="text-dark-300">Instant confirmation for your reservations</p>
              </div>
              <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-lg p-6">
                <CheckCircle className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Verified Spaces</h3>
                <p className="text-dark-300">Quality assured professional environments</p>
              </div>
              <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-lg p-6">
                <Clock className="h-8 w-8 text-primary-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Flexible Duration</h3>
                <p className="text-dark-300">Book by the hour or full day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Available Spaces</h2>
          <p className="text-dark-300">Browse our selection of premium spaces</p>
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
          <div className="text-center py-12 bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-lg">
            <p className="text-dark-300 mb-4">No spaces found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
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