const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const routes = require("./routes");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const init = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start({});
  server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static assets regardles to ensure app will run properly on Heroku before pushing
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

try {
  init();
} catch (error) {
  console.error(error);
}
