import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

import Event from './models/event.js';

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id:ID!
      title:String!
      description:String! 
      price:Float! 
      date: String! 
    }

    input EventInput {
      title:String! 
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return Event.find({});
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then((result) => {
            return { ...result._doc };
          })
          .catch((error) => {
            console.log(error);
            throw new error();
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    'mongodb+srv://bishal:bishal123@cluster0.rsgxl.mongodb.net/event?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log('hell');
    console.log(error.message);
  });
