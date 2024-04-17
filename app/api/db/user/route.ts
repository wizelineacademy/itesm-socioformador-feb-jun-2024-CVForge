import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
 }

 const { email, password, verification, is_active } = req.body;

 try {
    const newUser = await prisma.users.create({
      data: {
        email,
        password, // Consider hashing the password before storing it
        verification,
        is_active,
        last_login: new Date(), // Assuming you want to set the last login to the current time
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return res.status(201).json(newUser);
 } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
 }
}
