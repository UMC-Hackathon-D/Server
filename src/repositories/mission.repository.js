import { prisma } from "../db.config.js";

export const findOngoingMissionByUserId = async (userId) => {
  try {
    const ongoingMission = await prisma.userMission.findFirst({
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

    return ongoingMission;
  } catch (error) {
    console.error("Error in findOngoingMissionByUserId: ", error);
    throw error;
  }
};

export const findAvailableTargetUsers = async (partyId, userId) => {
  try {
    const availableUsers = await prisma.user.findMany({
      where: {
        AND: [
          { partyId: partyId },
          { NOT: { id: userId } },
          {
            NOT: {
              receivedMissions: {
                some: {
                  status: "ONGOING",
                },
              },
            },
          },
        ],
      },
      include: {
        character: {
          select: {
            id: true,
            photo: true,
          },
        },
      },
    });

    return availableUsers;
  } catch (error) {
    console.error("Error in findAvailableTargetUsers: ", error);
    throw error;
  }
};
