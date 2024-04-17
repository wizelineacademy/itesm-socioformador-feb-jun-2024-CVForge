import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  return user;
}

export default {
  findUserById
}