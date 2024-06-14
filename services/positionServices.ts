"use server";

import prisma from "@/lib/prisma";

export const getAllPositions = async () => {
  const positions = await prisma.desired_position.findMany();
  return positions;
};
