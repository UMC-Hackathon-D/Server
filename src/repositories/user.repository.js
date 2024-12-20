import { prisma } from "../db.config.js";

//파티 아이디, 유저 이름으로 파티 내 유저 검색
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

//파티 아이디, 유저 아이디로 파티 내 유저 검색
export const findUserById = async (partyId, userId) => {
  const user = await prisma.user.findFirst({
    where: {
      partyId: parseInt(partyId),
      id: parseInt(userId),
    },
  });

  if (!user) {
    return null;
  }

  return user;
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
      include: {
        party: true,
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

//닉네임 변경하기
export const updateUserName = async (data) => {
  const updateUserName = await prisma.user.update({
    where: {
      id: data.userId,
      partyId: data.partyId,
    },
    data: {
      name: data.userName,
    },
  });
  return updateUserName;
};

export const findTargetUserById = async (targetUserId) => {
  try {
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        name: true,
      },
    });
    return targetUser;
  } catch (error) {
    console.error("Error in findTargetUserById: ", error);
    throw error;
  }
};

export const updatePartyUserDelete = async (userId) => {
  const deleteUser = await prisma.user.update({
    where: { id : parseInt(userId) },
    data: {
      partyId: null,
      updateAt: new Date(),
    },
  });
  
  return deleteUser;
}