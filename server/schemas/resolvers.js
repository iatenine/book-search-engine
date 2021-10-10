const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Use JWT auth to find and return the appropriate user
    // GraphQL will automatically attach the user to the context
    me: async () => {
      console.log(user);
      console.log(req.user);
      // const user = await User.findOne({ where: { id: "1" } });
      // return user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, token) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      const signedToken = signToken(user);
      return {
        token: signedToken,
        user,
      };
    },

    addUser: async (parent, { username, email, password }, token) => {
      const user = await User.create({
        username,
        email,
        password,
      });

      const signedToken = signToken(user);

      return { token: signedToken, user };
    },

    saveBook: async (
      parent,
      { bookAuthors, description, title, bookId, image, link },
      token
    ) => {
      const user = await User.findOne({ id: token.userId });
      if (!user) {
        throw new Error("User does not exist");
      }

      const book = await Book.create({
        bookAuthors,
        description,
        title,
        bookId,
        image,
        link,
      });

      user.addBook(book);

      return user;
    },

    removeBook: async (parent, { bookId }, token) => {
      const user = await User.findOne({ id: token.userId });
      if (!user) {
        throw new Error("User does not exist");
      }

      const book = await Book.findOne({ id: bookId });
      if (!book) {
        throw new Error("Book does not exist");
      }

      user.removeBook(book);

      return user;
    },
  },
};

module.exports = resolvers;
