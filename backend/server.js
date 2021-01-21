import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

dotenv.config();

const db = process.env.db;

(async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });
  await mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'));

  app.listen({ port: 5000 }, () =>
    console.log(`Live at http://localhost:5000/graphql`)
  );
})();
