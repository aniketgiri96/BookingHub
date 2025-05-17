import React, { useState } from 'react';
import { useBooking, Service } from '../context/BookingContext';
import BookingList from '../components/BookingList';
import { Plus, Calendar, ClipboardList, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { services, allBookings, addService, addTimeSlot, loading } = useBooking();
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'availability'>('bookings');
  
  // Form states
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    image: '',
    category: ''
  });
  
  const [newSlot, setNewSlot] = useState({
    serviceId: '',
    date: '',
    startTime: ''
  });
  
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addService(newService);
    setNewService({
      name: '',
      description: '',
      duration: 60,
      price: 0,
      image: '',
      category: ''
    });
  };
  
  const handleTimeSlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTimeSlot(newSlot.serviceId, newSlot.date, newSlot.startTime);
    setNewSlot({
      serviceId: '',
      date: '',
      startTime: ''
    });
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">All Bookings</h2>
            <BookingList bookings={allBookings} isAdmin={true} />
          </div>
        );
        
      case 'services':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Manage Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {services.map(service => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-800">{service.name}</h3>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm">{service.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Duration: {service.duration} min</span>
                    <span>Price: ${service.price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Service</h3>
              <form onSubmit={handleServiceSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={newService.name}
                      onChange={(e) => setNewService({...newService, name: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newService.category}
                      onChange={(e) => setNewService({...newService, category: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: Number(e.target.value)})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: Number(e.target.value)})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newService.image}
                      onChange={(e) => setNewService({...newService, image: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex justify-center items-center"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Add Service'
                  )}
                </button>
              </form>
            </div>
          </div>
        );
        
      case 'availability':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Manage Availability</h2>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Time Slot</h3>
              <form onSubmit={handleTimeSlotSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service
                    </label>
                    <select
                      value={newSlot.serviceId}
                      onChange={(e) => setNewSlot({...newSlot, serviceId: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex justify-center items-center"
                >
                  {loading ? (
                    <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Add Time Slot'
                  )}
                </button>
              </form>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage bookings, services and availability</p>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 flex items-center justify-center ${
              activeTab === 'bookings'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ClipboardList className="h-5 w-5 mr-2" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 flex items-center justify-center ${
              activeTab === 'services'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Services
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 flex items-center justify-center ${
              activeTab === 'availability'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Availability
          </button>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default AdminDashboard;