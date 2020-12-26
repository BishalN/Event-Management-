import Event from '../../models/event.js';
import User from '../../models/user.js';
import { user, transformEvent } from './merge.js';

export default {
  events: async () => {
    const events = await Event.find({});
    return events.map((event) => {
      return transformEvent(event);
    });
  },

  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date).toISOString(),
        creator: '5fe566fd1e793b197c4b5a73',
      });
      const createdEvent = await event.save();
      const foundUser = await User.findById('5fe566fd1e793b197c4b5a73');
      foundUser.createdEvents.push(createdEvent);
      await foundUser.save();
      return {
        ...createdEvent._doc,
        creator: () => user(createdEvent._doc.creator),
      };
    } catch (error) {
      throw error;
    }
  },
};
