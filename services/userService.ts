"use server";
import prisma from "@/lib/prisma";
import { User } from "@/types/UserType";

const createNewUser = async (userEmail: string, userPassword: string) => {
  const userCreated = await prisma.users.create({
    data: {
      email: userEmail,
      password: userPassword,
    },
  });
  await prisma.professional_info.create({
    data: {
      user_id: userCreated.users_id,
    },
  });
  return userCreated;
};

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
};

export { createUser, findUserById, getAllUsers, createNewUser };
