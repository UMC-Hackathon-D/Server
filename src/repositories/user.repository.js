import { prisma } from "../db.config.js";

export const getUser = async (userName, partyName) => {

    const user = await prisma.user.findFirstOrThrow({
      where: {
        name: userName,
        party: {
          partyName: partyName, // Party 모델의 partyName 필터
        },
      }
    });
    return user;
  };
  