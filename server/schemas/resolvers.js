const { User, Book } = require("../models");

const resolvers = {
  Query: {
    // Use JWT auth to find and return the appropriate user
    // me: async () => {
    // }
  },
  Mutation: {
    login: async (parent, { email, password }, token) => {},

    addUser: async (parent, { username, email, password }, token) => {},

    saveBook: async (
      parent,
      { bookAuthors, description, title, bookId, image, link },
      token
    ) => {},

    removeBook: async (parent, { bookId }, token) => {},
  },
};

module.exports = resolvers;
