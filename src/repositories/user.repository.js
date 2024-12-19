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
        characterId: userData.characterId,
        partyId: parseInt(userData.partyId),
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

export const getUser = async (userName, partyName) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      name: userName,
      party: {
        partyName: partyName, // Party 모델의 partyName 필터
      },
    },
  });
  return user;
};
