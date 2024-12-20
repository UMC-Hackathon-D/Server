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

export const findCharacterById = async (characterId) => {
  try {
    const character = await prisma.character.findUnique({
      where: {
        id: characterId,
      },
    });

    return character;
  } catch (error) {
    console.error("Error in findCharacterById: ", error);
    throw error;
  }
};
