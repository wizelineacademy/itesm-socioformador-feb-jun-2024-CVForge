"use server";
import prisma from "@/lib/prisma";

const getUserIdByEmail = async (userEmail: string) => {
  const user = await prisma.users.findFirst({
    where: { email: userEmail },
  });
  return user.users_id;
};

const checkIfEmailInUse = async (userEmail: string) => {
  const user = await prisma.users.count({
    where: { email: userEmail },
  });
  return user;
};

const getProfessionalByEmail = async (userEmail: string) => {
  const user = await prisma.users.findFirst({
    where: { email: userEmail },
  });

  const professional_info = await prisma.professional_info.findFirst({
    where: { user_id: user.users_id },
  });
  return professional_info.professional_info_id;
};

export { getUserIdByEmail, getProfessionalByEmail, checkIfEmailInUse };
