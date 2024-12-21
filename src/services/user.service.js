import {
  userToResponseDTO,
  responseFromUser,
  updatedUserToResponseDTO,
} from "../dtos/user.dto.js";
import {
  findPartyIdByName,
  findPartyById,
  getPartyCurrentMembers,
} from "../repositories/party.repository.js";
import {
  findUserByName,
  createUser,
  getUser,
  updateUserName,
  findUserById,
  updateUserCharacterId,
} from "../repositories/user.repository.js";
import {
  PartyNotFoundError,
  DuplicatePartyUserNameError,
  PartyMemberLimitExceededError,
  InvalidPartyPasswordError,
} from "../errors/party.error.js";

import { CharacterNotFoundError } from "../errors/character.error.js";
import { findCharacterById } from "../repositories/character.repository.js";
import {
  ExsistsPartyToUserError,
  ExistUserNameError,
} from "../errors/user.error.js";

// add user to party
export const createPartyUser = async (userData) => {
  const partyId = await findPartyIdByName(userData.partyName);

  if (!partyId) {
    console.log(`Party not found - Name: ${userData.partyName}`);
    throw new PartyNotFoundError("Requested party does not exists", {
      noExists: userData.partyName,
    });
  }

  const party = await findPartyById(partyId);
  if (!party) {
    console.log(`Party not found - ID: ${partyId}`);
    throw new PartyNotFoundError("Requested party does not exists", {
      partyId,
    });
  }

  const existingUser = await findUserByName(partyId, userData.name);
  if (existingUser) {
    throw new DuplicatePartyUserNameError(
      "This name is already taken in the party",
      { partyId, name: userData.name }
    );
  }

  const currentMembers = await getPartyCurrentMembers(partyId);

  if (currentMembers >= party.numMember) {
    throw new PartyMemberLimitExceededError(
      "Party cannot accept more members",
      { partyId, currentMembers, maxMembers: 6 }
    );
  }

  if (party.password !== userData.password) {
    throw new InvalidPartyPasswordError("Invalid party password", {
      partyId,
      inputPassword: userData.password,
    });
  }

  const userDataWithParty = {
    ...userData,
    partyId: partyId,
  };

  const newUser = await createUser(userDataWithParty);

  return userToResponseDTO(newUser);
};

//파티 재입장하기
export const userEnter = async (data) => {
  //파티 존재 여부 확인
  const partyId = await findPartyIdByName(data.partyName);

  if (!partyId) {
    console.log(`Party not found - Name: ${data.partyName}`);
    throw new PartyNotFoundError("Requested party does not exists", {
      noExists: data.partyName,
    });
  }

  //유저 존재 여부 확인
  const user = await getUser(data.userName, data.partyName);

  if (user === null) {
    throw new ExsistsPartyToUserError("존재하지 않는 사용자 입니다.");
  }

  // console.log(user);
  return responseFromUser(user);
};

//유저 닉네임 변경하기
export const userRename = async (data) => {
  const isUserName = await findUserByName(data.partyId, data.userName);

  if (isUserName) {
    throw new ExistUserNameError("그룹 내 동일한 닉네임이 있습니다.");
  }

  const user = await updateUserName(data);

  return user;
};

// update user character
export const updateUseCharacter = async (partyId, userId, characterId) => {
  const character = await findCharacterById(characterId);
  if (!character) {
    throw new CharacterNotFoundError("Character not found", { characterId });
  }

  const updatedUser = await updateUserCharacterId(userId, characterId);

  return updatedUserToResponseDTO(updatedUser);
};
