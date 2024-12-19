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

//그룹(파티) 생성하기
export const addParty = async (data) => {
  const party = await prisma.party.findFirst({
    where: { partyName: data.partyName },
  });

  if (party) {
    return null;
  }
  console.log(data);
  // 파티 생성
  const createdParty = await prisma.party.create({
    data: {
      partyName: data.partyName,
      numMember: data.numMember,
      password: data.password,
      createAt: new Date(),
      updateAt: new Date(),
    },
  });

  // 유저 생성
  const createUser = await prisma.user.create({
    data: {
      name: data.name,
      partyId: createdParty.id,
      createAt: new Date(),
      updateAt: new Date(),
    },
  });

  return createdParty.id;
};
