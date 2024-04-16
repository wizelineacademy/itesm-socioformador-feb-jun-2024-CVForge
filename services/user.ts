import axios from 'axios';
import prisma from '@/lib/prisma';

const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3001';

export async function findUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  return user;
}