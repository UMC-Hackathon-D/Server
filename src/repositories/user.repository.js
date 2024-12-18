import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const findUserByName = async (partyId, userName) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        partyId: parseInt(partyId),
        name: userName,
      },
    });

    return user;
  } catch (error) {
    console.error("Error in findUserName: ", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  console.log(userData);
  try {
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        characterId: userData.character_id, // Convert snake_case to camelCase
        partyId: parseInt(userData.party_id), // Ensure partyId is a number
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in createUser: ", error);
    throw error;
  }
};
