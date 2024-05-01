import prisma from '@/lib/prisma';
import { User } from '@/types/user'

const createUser = async (userData: User) => {
  const user = await prisma.users.create({
    data: {
      ...userData,
      last_login: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  return user;
};

const findUserById = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { users_id: userId },
  });
  return user;
};

const getAllUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
}

export default {
  createUser,
  findUserById,
  getAllUsers
}
