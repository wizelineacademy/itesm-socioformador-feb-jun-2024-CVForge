import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3001';

const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  return user;
}


