"use server";
import prisma from "@/lib/prisma";

const getUserIdByEmail = async (userEmail : string) => {
  const user = await prisma.users.findFirst(
    {
      where : { email : userEmail},
    }
  );
  return user.users_id;
}

const getProfessionalByEmail = async (userEmail : string) => {
  const user = await prisma.users.findFirst({
    where: { email: userEmail },
  });

  if (!user) {
    console.error("No user found with that email");
    return null; // Handle no user found scenario
  }

  const professional_info = await prisma.professional_info.findFirst({
    where: { user_id: user.users_id }
  });

  if (!professional_info) {
    console.error("Professional info not found for the user");
    return null; // Handle no professional info found scenario
  }

  return professional_info.professional_info_id;
};

export {getUserIdByEmail, getProfessionalByEmail}