import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import schema from './graphql/schema/index.js';
import rootValue from './graphql/resolvers/index.js';
import isAuth from './graphql/middleware/is-auth.js';

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

mongoose
  .connect(
    'mongodb+srv://bishal:bishal123@cluster0.rsgxl.mongodb.net/event?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log('App is running');
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
  });
