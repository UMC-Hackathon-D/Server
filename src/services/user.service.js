
import { userToResponseDTO, responseFromUser } from "../dtos/user.dto.js";
import { findPartyById } from "../repositories/party.repository.js";
import {
  findUserByName,
  createUser,
  getUser,
} from "../repositories/user.repository.js";
import {
  PartyNotFoundError,
  DuplicatePartyUserNameError,
  PartyMemberLimitExceededError,
  InvalidPartyPasswordError,
} from "../party.error.js";

import {ExsistsPartyToUserError} from "../error.js";

export const createPartyUser = async (partyId, userData) => {
  console.log(userData);
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

  const currentMembers = party.numMember || 0;
  if (currentMembers >= 6) {
    throw new PartyMemberLimitExceededError(
      "Party cannot accept more members",
      { partyId, currentMembers, maxMembers: 6 }
    );
  }

  if (party.password !== userData.password) {
    throw new InvalidPartyPasswordError("Invalid party password", {
      partyId,
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

    const user = await getUser(data.user_name, data.party_name);

    if(user === null){
        throw new ExsistsPartyToUserError('존재하지 않는 사용자 입니다.');
    }

    // console.log(user);
    return responseFromUser(user);
};

