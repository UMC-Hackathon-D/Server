export const characterToResponseDTO = (character) => {
  return {
    id: character.id,
    photo: character.photo,
  };
};
