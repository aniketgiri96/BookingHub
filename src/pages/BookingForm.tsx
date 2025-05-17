import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking, TimeSlot } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import BookingCalendar from '../components/BookingCalendar';
import { Clock, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { getServiceById, createBooking, loading, error } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState(serviceId ? getServiceById(serviceId) : undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceById(serviceId);
      if (!serviceData) {
        navigate('/');
      } else {
        setService(serviceData);
      }
    }
  }, [serviceId, getServiceById, navigate]);
  
  if (!service || !user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };
  
  const handleBookingSubmit = async () => {
    if (!selectedTimeSlot || !user) return;
    
    setIsSubmitting(true);
    
    try {
      await createBooking(
        user.id,
        service.id,
        selectedTimeSlot.date,
        selectedTimeSlot.startTime
      );
      
      setBookingComplete(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      // Error is handled by the BookingContext
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {bookingComplete ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4 text-green-500">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully confirmed. Redirecting to your dashboard...
          </p>
          <div className="animate-pulse">
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Book {service.name}</h1>
            <p className="text-gray-600">{service.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">{service.name}</h2>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-2 text-blue-600" />
                      <span>Duration: {service.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                      <span>Price: ${service.price}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      <span>Category: {service.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Calendar and Booking Form */}
            <div className="lg:col-span-2">
              {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <BookingCalendar 
                serviceId={service.id} 
                onSelectTimeSlot={handleTimeSlotSelect}
              />
              
              {selectedTimeSlot && (
                <div className="mt-6 bg-white rounded-lg shadow p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Booking</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedTimeSlot.date}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTimeSlot.startTime}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{service.duration} minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-lg">${service.price}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBookingSubmit}
                    disabled={loading || isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingForm;