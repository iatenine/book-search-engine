const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User{
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    savedBooks [Book!]!
  }

  type Book{
    bookId: Int!
    title: String!
    description: String!
    authors: [String!]!
    image: String!
    link: String!
  }

  type Auth{
    token: String!
    user: User!
  }

  type Query {
      me: User
  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password:String!): Auth
      saveBook(bookAuthors:[String!]!, description: String!, title: String!, bookId: Int!, image: String!, link: String!): User
      removeBook(bookId: Int!): User
  }
`;

module.exports = typeDefs;
