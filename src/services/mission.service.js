import {
  findOngoingMissionByUserId,
  findAvailableTargetUsers,
  findRandomMissions,
  createUserMissionEntry,
} from "../repositories/mission.repository.js";
import {
  ongoingMissionsToResponseDTO,
  targetUserToResponseDTO,
  createUserMissionDTO,
  userMissionToResponseDTO,
} from "../dtos/mission.dto.js";
import {
  MissionNotFoundError,
  MissionNotOngoingError,
  NoAvailableTargetUsersError,
  UserHasOngoingMissionError,
} from "../errors/mission.error.js";

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

export const createUserMission = async (data) => {
  const existingMission = await findOngoingMissionByUserId(data.userId);

  if (existingMission) {
    throw new UserHasOngoingMissionError(
      "User already has an ongoing mission",
      {
        userId: data.userId,
        existingMissionId: existingMission.id,
      }
    );
  }

  const missionData = createUserMissionDTO(data);
  const userMission = await createUserMissionEntry(missionData);

  return userMissionToResponseDTO(userMission);
};
