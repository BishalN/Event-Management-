import Booking from '../../models/bookings.js';
import Event from '../../models/event.js';
import { transformEvent, transformBooking } from './merge.js';

export default {
  bookings: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error('UnAuthorized!');
      const bookings = await Booking.find({});
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error('UnAuthorized!');

      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: '5fe566fd1e793b197c4b5a73',
        event: fetchedEvent,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    if (!req.isAuth) throw new Error('UnAuthorized!');
    const booking = await Booking.findById(args.bookingId).populate('event');
    const event = transformEvent(booking.event);
    await Booking.deleteOne({ _id: args.bookingId });
    return event;
  },
};
