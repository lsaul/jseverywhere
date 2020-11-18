// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

// app.get('/', (req, res) => res.send('Hello World!!!'));

// Construct a schema using GraphQL schema language
const typeDefs = `
  type Note {
    id: Int
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID): Note
  }
`;

const resolvers = {
  Query: {
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
    // note: (parent, args, context, info) => {
    //   console.log(args);
    //   //   console.log(args.id);
    //   console.log(parent);
    //   //   console.log(context);
    //   //   console.log(info);
    //   console.log(notes.find(note => note.id === args.id));
    //   // return notes.find(note => notes.id === args.id);
    //   return notes.find(note => note.id === args.id);
    // }
  }
};

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const app = express();

//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo graphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    'GraphQL Server running at http//localhost: ' + port + server.graphqlPath
  )
);
