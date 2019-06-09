import { GraphQLServer } from 'graphql-yoga';

import { dburl } from './config';
import { startDb, models} from './db';

const db = startDb({ dburl });
const context = { models, db };

const typeDefs = `
    type Query {
        hello(name: String): String!
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: request => ({
        ...request,
        ...context
    })
});

server.start(_ => console.log('Server is up...'));