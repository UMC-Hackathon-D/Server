import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const findPartyById = async (partyId) => {
  try {
    const party = await prisma.party.findUnique({
      where: {
        id: parseInt(partyId),
      },
    });

    return party;
  } catch (error) {
    console.error("Error in findPartyById", error);
    throw error;
  }
};
