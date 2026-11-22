import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BookingContext = createContext(null);
const STORAGE_KEY = 'reproute-demo-booking';

const readStoredBooking = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(readStoredBooking);

  useEffect(() => {
    try {
      if (booking) localStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [booking]);

  const value = useMemo(() => ({
    booking,
    setBooking,
    clearBooking: () => setBooking(null)
  }), [booking]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used inside BookingProvider');
  return context;
};