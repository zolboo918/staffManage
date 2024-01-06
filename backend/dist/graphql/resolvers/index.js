import { userMutations, userQueries } from "./user/index";
const resolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...userMutations,
    },
};
export default resolvers;
