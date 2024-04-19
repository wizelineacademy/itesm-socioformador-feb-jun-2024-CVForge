"use server";

import prisma from '@/lib/prisma';
import {User} from '@/types/user'

export const findUserById = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { users_id: userId },
  });
  return user;
};

export const getAllUsers = async() => {
  const users = await prisma.users.findMany();
  return users;
}

export const createUser = async (userData: User) => {
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
