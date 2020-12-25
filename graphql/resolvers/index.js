import bcrypt from 'bcryptjs';

import Event from '../../models/event.js';
import User from '../../models/user.js';

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: () => user(event._doc.creator),
      };
    });
  } catch (error) {}
};

const user = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    return {
      ...foundUser._doc,
      createdEvents: () => events(foundUser._doc.createdEvents),
    };
  } catch (error) {}
};

export default {
  events: async () => {
    const events = await Event.find({});
    return events.map((event) => {
      return {
        ...event._doc,
        creator: () => user(event._doc.creator),
      };
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
  createUser: async (args) => {
    try {
      const userExists = await User.findOne({
        email: args.userInput.email,
      });
      if (userExists) {
        throw new Error('User already exists');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const createdUser = await user.save();
      return { email: createdUser.email };
    } catch (error) {
      throw error.message;
    }
  },
};
