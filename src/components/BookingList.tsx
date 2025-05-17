import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, Tag, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Booking } from '../context/BookingContext';

type BookingListProps = {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
  isAdmin?: boolean;
};

const BookingList: React.FC<BookingListProps> = ({ 
  bookings, 
  onCancelBooking,
  isAdmin = false
}) => {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-400 mb-4">
          <Calendar className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings found</h3>
        <p className="text-gray-500">
          {isAdmin 
            ? "There are no bookings in the system yet."
            : "You haven't made any bookings yet. Start by booking a service!"
          }
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div 
          key={booking.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
        >
          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                {booking.serviceName}
              </h3>
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                <span className="ml-1 capitalize">{booking.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                <span>{format(new Date(booking.date), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
            </div>
            
            {isAdmin && (
              <div className="mb-4 pt-3 border-t border-gray-100">
                <div className="flex items-center text-gray-600">
                  <Tag className="h-5 w-5 mr-2 text-blue-600" />
                  <span>User ID: {booking.userId}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Created: {format(parseISO(booking.createdAt), 'MMM d, yyyy h:mm a')}
                </div>
              </div>
            )}
            
            {booking.status === 'confirmed' && onCancelBooking && (
              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => onCancelBooking(booking.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList;