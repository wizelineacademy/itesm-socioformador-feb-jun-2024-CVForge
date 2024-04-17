import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';


const createUser = async () => {

}
const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  return user;
}

export default {
  findUserById
}