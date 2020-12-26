import bcrypt from 'bcryptjs';

import User from '../../models/user.js';

export default {
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
      return { ...createdUser._doc, _id: createdUser.id };
    } catch (error) {
      throw error.message;
    }
  },
};
