export const userToServiceEntity = (body) => {
  return {
    name: body.name,
    character_id: body.characterId,
    create_at: new Date(),
    update_at: new Date(),
  };
};

export const userToResponseDTO = (user) => {
  return {
    id: user.id,
    name: user.name,
    characterId: user.character_id,
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
          name: user.party.party_name,
          numMember: user.party.num_member,
        }
      : null,
    createdAt: user.create_at,
    updatedAt: user.update_at,
  };
};
export const responseFromUser = (user) => {
  return {
    userId: user.id,
    userName: user.name,
  };
};

export const bodyToUser = (userName, partyName) => {
  return {
    user_name: userName,
    party_name: partyName,
  };
};
