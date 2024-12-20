import { prisma } from "../db.config.js";

export const getAllCharacters = async () => {
  try {
    const characters = await prisma.character.findMany();

    return characters;
  } catch (error) {
    console.error("Error in getAllCharacters: ", error);
    throw error;
  }
};
