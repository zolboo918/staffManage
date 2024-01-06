import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema.js";
const server = new ApolloServer({
    schema,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 9000 },
});
console.log(`🚀  Server ready at: ${url}`);
