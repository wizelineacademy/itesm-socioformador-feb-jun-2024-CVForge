/*
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: 'Error fetching users', detail: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { email, first_name, last_name, password } = await req.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                first_name,
                last_name,
                password: hashedPassword // Store the hashed password
            },
        });

        return NextResponse.json(newUser, { status: 200 });
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: 'Error creating user', detail: error.message }, { status: 500 });
    }
}*/