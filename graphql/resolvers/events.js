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

  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error('UnAuthorized!');
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date).toISOString(),
        creator: req.userId,
      });
      const createdEvent = await event.save();
      const foundUser = await User.findById(req.userId);
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
