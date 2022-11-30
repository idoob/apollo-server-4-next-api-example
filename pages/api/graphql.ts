import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import { buildContext, Context } from "../../context";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User
    hello: String!
  }
  type User {
    name: String
    username: String
  }
`;

const users = [
  { name: "Leeroy Jenkins", username: "leeroy" },
  { name: "Foo Bar", username: "foobar" },
];

const resolvers = {
  Query: {
    users() {
      return users;
    },
    user(_parent, args) {
      return users.find((user) => user.username === args.username);
    },
    hello(_parent, _args, ctx: Context) {
      return ctx.datasources.helloDataSource();
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
