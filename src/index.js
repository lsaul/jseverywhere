// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');
const { Mongoose } = require('mongoose');

const DB_HOST = process.env.DB_HOST;

db.connect(DB_HOST);

const port = process.env.PORT || 4000;

// app.get('/', (req, res) => res.send('Hello World!!!'));

// Construct a schema using GraphQL schema language
const typeDefs = `
  type Note {
    id: ID
    content: String
    author: String
  }
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID): Note
  }
  type Mutation{
      newNote(content: String!): Note
  }
`;

const resolvers = {
  Query: {
    notes: async () => {
      return await models.Note.find();
    },
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
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
  //   Mutation: {
  //     newNote: async (parent, args) => {
  //       let noteValue = {
  //         id: String(notes.length + 1),
  //         content: args.content,
  //         author: 'Adam Scott'
  //       };
  //       notes.push(noteValue);
  //       return noteValue;
  //       console.log('Added note?');
  //     }
  //   }
};

// let notes = [
//   { id: '1', content: 'This is a note', author: 'Adam Scott' },
//   { id: '2', content: 'This is another note', author: 'Harlow Everly' },
//   { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
// ];

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
