import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const userMutations = {
    createUser: async (_, args) => {
        const salt = await bcrypt.genSalt(10);
        const user = args.user;
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = await prisma.user.create({ data: args.user });
        return newUser;
    },
    updateUser: async (_, args) => {
        const user = await prisma.user.update({
            where: { id: parseInt(args.id) },
            data: args.user,
        });
        return user;
    },
    deleteUser: async (_, args) => {
        const user = await prisma.user.delete({
            where: { id: parseInt(args.id) },
        });
        return user;
    },
    login: async (_, args) => {
        const user = await prisma.user.findFirst({
            where: { email: args.email },
        });
        if (!user) {
            throw new GraphQLError("Username or passwor wrong!");
        }
        const ok = await bcrypt.compare(args.password, user.password);
        if (!ok) {
            throw new GraphQLError("Username or passwor wrong!");
        }
        return user;
    },
    register: async (_, args) => {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(args.password, salt);
        const user = await prisma.user.create({
            data: { email: args.email, password: newPassword },
        });
        if (!user) {
            throw new GraphQLError("Something went wrong!");
        }
        return user;
    },
};
export default userMutations;
