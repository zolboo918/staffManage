import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { sendGridEmailSender } from "../../../util/sendMail.js";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const userMutations = {
    createUser: async (_, args) => {
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
        const jsonWebToken = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });
        return { ...user, accessToken: jsonWebToken };
    },
    register: async (_, args) => {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(args.password, salt);
        const user = await prisma.user.create({
            data: { email: args.email, password: newPassword, isAdmin: args.isAdmin },
        });
        if (!user) {
            throw new GraphQLError("Something went wrong!");
        }
        return user;
    },
    sendResetPasswordTokenEmail: async (_, args) => {
        const user = await prisma.user.findFirst({
            where: { email: args.email },
        });
        if (!user) {
            throw new GraphQLError("User not found!");
        }
        const resetCode = Math.floor(1000 + Math.random() * 9000);
        const userTokeUpdated = await prisma.user.update({
            where: { email: args.email },
            data: { passwordToke: resetCode.toString() },
        });
        const option = {
            to: `${args.email}`,
            html: `<b>Сайн байна уу</b><br><br>Та нууц үг сэргээх хүсэлт гаргасан байна. <br> Таний нууц үг сэргээх код: ${resetCode}`,
        };
        sendGridEmailSender(option);
        return userTokeUpdated;
    },
    checkPasswordToken: async (_, args) => {
        const user = await prisma.user.findFirst({
            where: { email: args.email, passwordToke: args.token },
        });
        if (!user) {
            throw new GraphQLError("Token incorrect!");
        }
        return user;
    },
    changePassword: async (_, args) => {
        const user = await prisma.user.findFirst({ where: { email: args.email } });
        if (!user.passwordToke) {
            throw new GraphQLError("Token expired");
        }
        const salt = await bcrypt.genSalt(10);
        args.newPassword = await bcrypt.hash(args.newPassword, salt);
        const updatedUser = await prisma.user.update({
            where: { email: args.email },
            data: { password: args.newPassword, passwordToke: null },
        });
        if (!user) {
            throw new GraphQLError("Something went wrong!");
        }
        return updatedUser;
    },
};
export default userMutations;
