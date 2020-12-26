import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        throw new Error('Invalid Credentials');
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error('Invalid Credentials');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, 'secret', {
        expiresIn: '1h',
      });

      return { userId: user.id, token, tokenExpiration: 1 };
    } catch (error) {}
  },
};
