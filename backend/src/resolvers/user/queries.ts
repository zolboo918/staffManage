import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userQueries = {
  users: async () => {
    const users = await prisma.user.findMany();
    return users;
  },
  user: async (_, args: { id: string }) => {
    const users = await prisma.user.findUnique({
      where: { id: parseInt(args.id) },
    });
    return users;
  },
  allAdmins: async () => {
    const allAdmins = await prisma.user.findMany({ where: { isAdmin: true } });
    return allAdmins;
  },
  allUsers: async () => {
    const allUsers = await prisma.user.findMany({
      where: { isAdmin: false || null },
    });
    return allUsers;
  },
};

export default userQueries;
