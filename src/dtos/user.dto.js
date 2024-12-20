export const userToServiceEntity = (body) => {
  return {
    partyName: body.partyName,
    name: body.name,
    password: body.password,
    createAt: new Date(),
    updateAt: new Date(),
  };
};

export const userToResponseDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
    partyId: user.partyId,
    party: user.party
      ? {
          id: user.party.id,
          name: user.party.partyName,
          numMember: user.party.numMember,
        }
      : null,
    createAt: user.createAt,
    updateAt: user.updateAt,
  };
};

export const updatedUserToResponseDTO = (updatedUser) => {
  return {
    id: updatedUser.id,
    name: updatedUser.name,
    partyId: updatedUser.partyId,
    characterid: updatedUser.characterId,
    character: updatedUser.character
      ? {
          id: updatedUser.character.id,
          photo: updatedUser.character.photo,
        }
      : null,
    party: updatedUser.party
      ? {
          id: updatedUser.party.id,
          name: updatedUser.party.partyName,
          numMember: updatedUser.party.numMember,
        }
      : null,
    createAt: updatedUser.createAt,
    updateAt: updatedUser.updateAt,
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
        userName: userName,
        partyName: partyName,
    }
}

//닉네임 재설정 요청 dto
export const bodyToRenameUser = (userId,partyId,body) =>{
  return {
    userName: body.name,
    partyId: parseInt(partyId),
    userId: parseInt(userId),
  }
}


export const bodyToUser = (userName, partyName) => {
  return {
    userName: userName,
    partyName: partyName,
  };
};
