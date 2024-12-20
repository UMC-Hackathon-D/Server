export const ongoingMissionsToResponseDTO = (mission) => {
  // mission이 null이거나 undefined인 경우 null 반환
  if (!mission) {
    return null;
  }

  return {
    userMissionId: mission.id,
    missionId: mission.missionId,
    missionName: mission.mission?.missionName,
    missionContent: mission.mission?.missionContent,
    missionUserId: mission.missionUserId,
    targetUserId: mission.targetUserId,
    status: mission.status,
    createdAt: mission.createAt,
    updatedAt: mission.updateAt,
  };
};

export const targetUserToResponseDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
    characterId: user.characterId,
    character: user.character
      ? {
          id: user.character.id,
          photo: user.character.photo,
        }
      : null,
  };
};

export const createUserMissionDTO = (data) => {
  return {
    missionId: data.missionId,
    missionUserId: data.userId,
    targetUserId: data.targetUserId,
    status: "ONGOING",
    createAt: new Date(),
    updateAt: new Date(),
  };
};

export const userMissionToResponseDTO = (userMission) => {
  return {
    id: userMission.id,
    missionId: userMission.missionId,
    missionUserId: userMission.missionUserId,
    targetUserId: userMission.targetUserId,
    status: userMission.status,
    createdAt: userMission.createAt,
    updatedAt: userMission.updateAt,
  };
};
