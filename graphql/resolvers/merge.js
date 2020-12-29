import User from '../../models/user.js';
import Event from '../../models/event.js';

export const transformEvent = (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    creator: () => user(event._doc.creator),
  };
};

export const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: () => user(booking._doc.user),
    event: () => singlEvent(booking._doc.event),
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
  };
};

export const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

export const singlEvent = async (eventId) => {
  console.log(eventId);
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {}
};

export const user = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    return {
      ...foundUser._doc,
      createdEvents: () => events(foundUser._doc.createdEvents),
    };
  } catch (error) {}
};
