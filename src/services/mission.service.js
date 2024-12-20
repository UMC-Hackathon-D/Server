import {
  findOngoingMissionByUserId,
  findAvailableTargetUsers,
  findRandomMissions,
} from "../repositories/mission.repository.js";
import {
  ongoingMissionsToResponseDTO,
  targetUserToResponseDTO,
} from "../dtos/mission.dto.js";
import {
  MissionNotFoundError,
  MissionNotOngoingError,
  NoAvailableTargetUsersError,
} from "../mission.error.js";

export const getUserOngoingMission = async (partyId, userId) => {
  const ongoingMission = await findOngoingMissionByUserId(userId);

  if (!ongoingMission) {
    throw new MissionNotFoundError("No mission found for this user", {
      userId,
    });
  }

  if (ongoingMission.status !== "ONGOING") {
    throw new MissionNotOngoingError(
      "Mission exists but is not in ongoing status",
      {
        userId,
        missionId: ongoingMission.id,
        currentStatus: ongoingMission.status,
      }
    );
  }

  return ongoingMission ? ongoingMissionsToResponseDTO(ongoingMission) : null;
};

export const getAvailableTargetUsers = async (partyId, userId) => {
  const availableTargetUsers = await findAvailableTargetUsers(partyId, userId);

  if (!availableTargetUsers || availableTargetUsers.length === 0) {
    throw new NoAvailableTargetUsersError("No available target users found", {
      partyId,
      userId,
    });
  }
  return availableTargetUsers.map((user) => targetUserToResponseDTO(user));
};

export const getRandomMissions = async () => {
  const randomMissions = await findRandomMissions();

  if (!randomMissions || randomMissions.length === 0) {
    throw new MissionNotFoundError("No missions found in the database");
  }

  return randomMissions;
};
