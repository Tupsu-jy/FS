const { ApolloServer, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const typeDefs = require('./schema/typedefs');
const resolvers = require('./schema/resolvers');
const { connectDB } = require('./connection/db');

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
