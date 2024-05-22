"use server";
import prisma from "@/lib/prisma";

const getUserIdByEmail = async (userEmail : string) => {
  const user = await prisma.users.findFirst(
    {
      where : { email : userEmail},
    }
  );
  return user.users_id;
}

export {getUserIdByEmail}