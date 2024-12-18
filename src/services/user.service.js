import { userToResponseDTO } from "../dtos/user.dto.js";
import { findPartyById } from "../repositories/party.repository.js";
import { findUserByName, createUser } from "../repositories/user.repository.js";
import {
  PartyNotFoundError,
  DuplicatePartyUserNameError,
  PartyMemberLimitExceededError,
} from "../party.error.js";

export const createPartyUser = async (partyId, userData) => {
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

  const currentMembers = party.num_member || 0;
  if (currentMembers >= 6) {
    throw new PartyMemberLimitExceededError(
      "Party cannot accept more members",
      { partyId, currentMembers, maxMembers: 6 }
    );
  }

  const userDataWithParty = {
    ...userData,
    party_id: partyId,
  };

  const newUser = await createUser(userDataWithParty);

  return userToResponseDTO(newUser);
};
