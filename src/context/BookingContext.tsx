import React, { createContext, useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';

// Types
export type Service = {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  image: string;
  category: string;
};

export type TimeSlot = {
  id: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  available: boolean;
};

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
};

type BookingContextType = {
  services: Service[];
  availableSlots: TimeSlot[];
  userBookings: Booking[];
  allBookings: Booking[];
  getServiceById: (id: string) => Service | undefined;
  createBooking: (userId: string, serviceId: string, date: string, startTime: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  getAvailableSlots: (serviceId: string, date: string) => Promise<TimeSlot[]>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  addTimeSlot: (serviceId: string, date: string, startTime: string) => Promise<void>;
  loading: boolean;
  error: string | null;
};

// Sample data
const sampleServices: Service[] = [
  {
    id: '1',
    name: 'Business Meeting Room',
    description: 'Perfect for team meetings and client presentations. Equipped with projector and whiteboard.',
    duration: 60,
    price: 50,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'meeting'
  },
  {
    id: '2',
    name: 'Conference Hall',
    description: 'Large hall for conferences, seminars, and corporate events. Can accommodate up to 100 people.',
    duration: 180,
    price: 200,
    image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'conference'
  },
  {
    id: '3',
    name: 'Private Office',
    description: 'Quiet private office for focused work or confidential meetings.',
    duration: 60,
    price: 25,
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'office'
  },
  {
    id: '4',
    name: 'Creative Studio',
    description: 'Well-lit studio space ideal for photoshoots, art projects, or creative workshops.',
    duration: 120,
    price: 75,
    image: 'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'studio'
  },
  {
    id: '5',
    name: 'Training Room',
    description: 'Equipped room for training sessions and workshops with flexible seating arrangements.',
    duration: 240,
    price: 150,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'training'
  },
  {
    id: '6',
    name: 'Hot Desk',
    description: 'Flexible desk space in a shared coworking environment.',
    duration: 60,
    price: 10,
    image: 'https://images.pexels.com/photos/7978314/pexels-photo-7978314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'coworking'
  }
];

// Generate sample time slots for the next 7 days
const generateSampleTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // For each service, create available slots
    sampleServices.forEach(service => {
      // Create slots from 8AM to 6PM
      for (let hour = 8; hour < 18; hour++) {
        // Create a slot for every hour
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        slots.push({
          id: `${service.id}-${dateStr}-${startTime}`,
          serviceId: service.id,
          date: dateStr,
          startTime,
          available: Math.random() > 0.3 // Random availability
        });
      }
    });
  }
  
  return slots;
};

const sampleTimeSlots = generateSampleTimeSlots();

const sampleBookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    serviceId: '1',
    serviceName: 'Business Meeting Room',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '14:00',
    endTime: '15:00',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(sampleServices);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(sampleTimeSlots);
  const [userBookings, setUserBookings] = useState<Booking[]>(sampleBookings);
  const [allBookings, setAllBookings] = useState<Booking[]>(sampleBookings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const getAvailableSlots = async (serviceId: string, date: string): Promise<TimeSlot[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return availableSlots.filter(
        slot => slot.serviceId === serviceId && slot.date === date && slot.available
      );
    } catch (err) {
      setError((err as Error).message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (userId: string, serviceId: string, date: string, startTime: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const service = getServiceById(serviceId);
      if (!service) {
        throw new Error('Service not found');
      }

      // Calculate end time based on service duration
      const [hours, minutes] = startTime.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours, minutes);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + service.duration);
      
      const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
      
      // Create new booking
      const newBooking: Booking = {
        id: Date.now().toString(),
        userId,
        serviceId,
        serviceName: service.name,
        date,
        startTime,
        endTime,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      // Update bookings state
      setUserBookings(prev => [...prev, newBooking]);
      setAllBookings(prev => [...prev, newBooking]);
      
      // Update slot availability
      setAvailableSlots(prev => 
        prev.map(slot => 
          (slot.serviceId === serviceId && slot.date === date && slot.startTime === startTime)
            ? { ...slot, available: false }
            : slot
        )
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the booking
      const booking = userBookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      // Update booking status
      const updatedUserBookings = userBookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      
      const updatedAllBookings = allBookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      
      setUserBookings(updatedUserBookings);
      setAllBookings(updatedAllBookings);
      
      // Make the slot available again
      setAvailableSlots(prev => 
        prev.map(slot => 
          (slot.serviceId === booking.serviceId && slot.date === booking.date && slot.startTime === booking.startTime)
            ? { ...slot, available: true }
            : slot
        )
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newService: Service = {
        ...service,
        id: Date.now().toString()
      };
      
      setServices(prev => [...prev, newService]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addTimeSlot = async (serviceId: string, date: string, startTime: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSlot: TimeSlot = {
        id: `${serviceId}-${date}-${startTime}`,
        serviceId,
        date,
        startTime,
        available: true
      };
      
      setAvailableSlots(prev => [...prev, newSlot]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    services,
    availableSlots,
    userBookings,
    allBookings,
    getServiceById,
    createBooking,
    cancelBooking,
    getAvailableSlots,
    addService,
    addTimeSlot,
    loading,
    error
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};