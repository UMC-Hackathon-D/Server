import { findOngoingMissionByUserId } from "../repositories/mission.repository.js";
import { ongoingMissionsToResponseDTO } from "../dtos/mission.dto.js";
import {
  MissionNotFoundError,
  MissionNotOngoingError,
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
