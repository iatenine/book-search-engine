const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Use JWT auth to find and return the appropriate user
    // GraphQL will automatically attach the user to the context
    me: async () => {
      const user = await User.findOne({ where: { id: "1" } });
      return user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, token) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User does not exist");
      }
      const valid = await user.validatePassword(password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      return {
        token: "token",
      };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        username,
        email,
        password,
      });

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (
      parent,
      { bookAuthors, description, title, bookId, image, link },
      token
    ) => {},

    removeBook: async (parent, { bookId }, token) => {},
  },
};

module.exports = resolvers;
