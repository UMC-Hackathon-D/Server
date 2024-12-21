import { prisma } from "../db.config.js";

export const findOngoingMissionByUserId = async (userId) => {
  try {
    const ongoingMission = await prisma.userMission.findFirst({
      where: {
        missionUserId: parseInt(userId),
        status: "in_progress",
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
                  status: "in_progress",
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

export const findRandomMissions = async () => {
  try {
    const allMissions = await prisma.mission.findMany({
      select: {
        id: true,
        missionName: true,
        missionContent: true,
      },
    });

    const randomMissions = allMissions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return randomMissions;
  } catch (error) {
    console.error("Error in findRandomMissions: ", error);
    throw error;
  }
};

export const createUserMissionEntry = async (missionData) => {
  try {
    const userMission = await prisma.userMission.create({
      data: missionData,
    });
    return userMission;
  } catch (error) {
    console.error("Error in createUserMissionEntry: ", error);
    throw error;
  }
};

export const findMissionById = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    return mission;
  } catch (error) {
    console.error("Error in findMissionById: ", error);
    throw error;
  }
};
