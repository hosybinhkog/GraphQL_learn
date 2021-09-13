const { ApolloServer } =require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } =require('apollo-server-core');
const express =require('express');
const http =require('http');
const typeDefs = require('./schema/index')
const resolvers = require('./resolver/index')
const mongoose = require('mongoose')


const URL = 'mongodb+srv://binhdeptroai:1234@cluster0.fu3k6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



const connectDB = async () => {
  try {
    await mongoose.connect(URL,
      {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
      }
    )
    console.log('Connected to database Success')
  } catch (error) {
    console.log(error.message)
    process.exit(1);
  }
}

connectDB();

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}



startApolloServer(typeDefs, resolvers)
