import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try{
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  }
  catch(error){
    console.error("Error fetching users: ", error);
    return NextResponse.error();
  }
}