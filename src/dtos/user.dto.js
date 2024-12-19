
export const userToServiceEntity = (body) => {
  return {
    name: body.name,
    characterId: body.characterId,
    password: body.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const userToResponseDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
    characterId: user.characterId,
    partyId: user.party_id,
    character: user.character
      ? {
          id: user.character.id,
          photo: user.character.photo,
        }
      : null,
    party: user.party
      ? {
          id: user.party.id,
          name: user.party.partyName,
          numMember: user.party.numMember,
        }
      : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};


// 그룹 재입장 전송 DTO
export const responseFromUser = (user) => {
  return {
    userId: user.id,
    userName: user.name,
  };
};


// 그륩 재입장 요청 DTO
export const bodyToUser = (userName,partyName) =>{
    return {
        user_name: userName,
        party_name: partyName,
    }
}

