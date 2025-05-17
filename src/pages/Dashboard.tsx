import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import BookingList from '../components/BookingList';
import { Calendar, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userBookings, cancelBooking, loading } = useBooking();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [filteredBookings, setFilteredBookings] = useState(userBookings);
  
  useEffect(() => {
    if (!user) return;
    
    // Filter bookings by active/past and user
    const today = new Date().toISOString().split('T')[0];
    const userFilteredBookings = userBookings.filter(booking => booking.userId === user.id);
    
    if (activeTab === 'active') {
      setFilteredBookings(userFilteredBookings.filter(
        booking => booking.date >= today && booking.status !== 'cancelled'
      ));
    } else {
      setFilteredBookings(userFilteredBookings.filter(
        booking => booking.date < today || booking.status === 'cancelled'
      ));
    }
  }, [userBookings, user, activeTab]);
  
  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your upcoming and past bookings</p>
        </div>
        <Link
          to="/"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'active'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upcoming Bookings
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
              activeTab === 'past'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Past Bookings
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredBookings.length > 0 ? (
        <BookingList 
          bookings={filteredBookings} 
          onCancelBooking={activeTab === 'active' ? handleCancelBooking : undefined}
        />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {activeTab === 'active' ? 'upcoming' : 'past'} bookings
          </h3>
          <p className="text-gray-500 mb-6">
            {activeTab === 'active'
              ? "You don't have any upcoming bookings."
              : "You don't have any past bookings."
            }
          </p>
          {activeTab === 'active' && (
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Book Now
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;