import authResolver from './auth.js';
import eventResolver from './events.js';
import bookingResolver from './bookings.js';

export default {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver,
};
