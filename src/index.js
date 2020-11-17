// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

const app = express();
//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

app.get('/', (req, res) => res.send('Hello World!!!'));

app.listen({ port }, () =>
  console.log(
    'GraphQL Server running at http//localhost: ' + port + server.graphqlPath
  )
);

//Apply the Apollo graphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};
