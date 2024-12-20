import { prisma } from "../db.config.js";

//파티 아이디로 파티 내 유저 검색
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

// 파티 재입장하기
export const getUser = async (userName, partyName) => {
  const user = await prisma.user.findFirst({
    where: {
      name: userName,
      party: {
        partyName: partyName,
      },
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

// user character update
export const updateUserCharacterId = async (userId, characterId) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        characterId: characterId,
        updateAt: new Date(),
      },
      include: {
        character: true,
        party: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error in updateUserCharacterId: ", error);
    throw error;
  }
};
