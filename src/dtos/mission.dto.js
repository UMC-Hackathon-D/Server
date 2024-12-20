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
