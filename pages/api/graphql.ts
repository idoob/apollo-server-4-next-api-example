import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'graphql-tag';
import { buildContext, Context } from '../../shared/context/context';

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User
    hello: [String!]
  }
  type User {
    name: String
    username: String
  }
`;

const users = [
  { name: 'Leeroy Jenkins', username: 'leeroy' },
  { name: 'Foo Bar', username: 'foobar' },
];

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(parent, { user }, ctx, info) {
      console.log(ctx);
      return users.find((user) => user.username === username);
    },
    hello(parent, args, ctx) {
      return ctx.hello();
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer<Context>({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: buildContext,
});
