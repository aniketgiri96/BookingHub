import React, { useState, useEffect } from 'react';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { useBooking, TimeSlot } from '../context/BookingContext';
import { Clock } from 'lucide-react';

type BookingCalendarProps = {
  serviceId: string;
  onSelectTimeSlot: (slot: TimeSlot) => void;
};

const BookingCalendar: React.FC<BookingCalendarProps> = ({ serviceId, onSelectTimeSlot }) => {
  const { getAvailableSlots, loading } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Generate 7 days starting from today
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const slots = await getAvailableSlots(serviceId, dateStr);
      setAvailableSlots(slots);
    };

    fetchAvailableSlots();
  }, [serviceId, selectedDate, getAvailableSlots]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleTimeSlotClick = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    onSelectTimeSlot(slot);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date & Time</h3>
      
      {/* Date selector */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {next7Days.map((date) => (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`px-3 py-2 rounded-md min-w-[80px] text-center transition-colors duration-200 flex-shrink-0 ${
                isSameDay(date, selectedDate)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium">{format(date, 'EEE')}</div>
              <div className="text-sm">{format(date, 'MMM d')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-3">Available Time Slots</h4>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSlotClick(slot)}
                className={`px-3 py-2 rounded-md text-center transition-colors duration-200 ${
                  selectedSlot?.id === slot.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{slot.startTime}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No available slots for this date.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;