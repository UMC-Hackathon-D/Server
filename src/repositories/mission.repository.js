import { prisma } from "../db.config.js";

export const findOngoingMissionByUserId = async (userId) => {
  try {
    const ongoingMissions = await prisma.userMission.findFirst({
      where: {
        missionUserId: parseInt(userId),
        status: "ONGOING",
      },
      include: {
        mission: true,
        missionUser: {
          select: {
            id: true,
            name: true,
            party: {
              select: {
                id: true,
                partyName: true,
              },
            },
          },
        },
        targetUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return ongoingMissions;
  } catch (error) {
    console.error("Error in findOngoingMissionsByUserId:", error);
    throw error;
  }
};
