"use server"
import prisma from "@/lib/prisma";

//Get General Information from an specific user_id
const getGeneralInfo = async (userID: string) => {
  const generalInfo = await prisma.users.findUnique({
    where: {
      users_id: userID,
    },
    include: {
      professional_info: {
        include: {
          general_info: true
        },
      },
    },
  });
  console.log(generalInfo);
  return generalInfo;
}


//Create the general information from an specific user_id


export {getGeneralInfo}
