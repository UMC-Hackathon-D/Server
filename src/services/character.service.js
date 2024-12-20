import { getAllCharacters } from "../repositories/character.repository.js";
import { characterToResponseDTO } from "../dtos/character.dto.js";
import { CharacterNotFoundError } from "../character.error.js";

export const getCharacters = async () => {
  const characters = await getAllCharacters();

  if (!characters || characters.length === 0) {
    console.log("Character not found");
    throw new CharacterNotFoundError("There is no existing characters");
  }

  return characters.map((character) => characterToResponseDTO(character));
};
