import { prisma } from "../db.config.js";

export const findPartyIdByName = async (partyName) => {
  try {
    const party = await prisma.party.findUnique({
      where: {
        partyName: partyName,
      },
    });

    return party ? party.id : null;
  } catch (error) {
    console.error("Error in findPartyIdByName", error);
    throw error;
  }
};

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


//파티 아이디로 파티 조회
export const getParty = async (partyId)=>{
    const party = await prisma.party.findFirst({where: {id: partyId}});

    if(!party) {
        return null;
    }

    return party;
}

// // 파티 정보 조회 이름으로 검색
// export const getCheckParty = async (partyName)=>{
//     const party = await prisma.party.findFirst({where: {partyName: partyName}});
//
//     if(party) {
//         return null;
//     }
//
//     return party;
// }

//파티원 조회
export const getPartyMembers = async (partyId) => {
  const users = await prisma.user.findMany(
    {
      where: {
        partyId: parseInt(partyId)
      }
    }
  )

  return users;
}