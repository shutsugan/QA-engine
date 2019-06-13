import { GraphQLServer } from 'graphql-yoga';

import { dburl } from './config';
import { startDb, models} from './db';

import Query from './graphql/resolvers/Query';
import Mutation from './graphql/resolvers/Mutation';
import User from './graphql/resolvers/User';
import Quastion from './graphql/resolvers/Quastion';
import Answer from './graphql/resolvers/Answer';
import Vote from './graphql/resolvers/Vote';

const db = startDb({ dburl });
const typeDefs = `${__dirname}/graphql/schema.graphql`;
const resolvers = { Query, Mutation, User, Quastion, Answer, Vote};
const context = { models, db };

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: request => ({
        ...request,
        ...context
    })
});

server.start(_ => console.log('Server is up...'));
