import {responseFromPartyCreate, responseFromPartyMembers} from "../dtos/party.dto.js";
import {addParty, getParty, getPartyMembers} from "../repositories/party.repository.js";
import {ExsistsPartyNameError} from "../error.js";
import { IsThereNoMemberInPartyError } from "../party.error.js";

// 그룹 생성하기
export const partyCreate = async (data)=>{
    const partyId = await addParty(data);

    if(partyId === null){
        throw new ExsistsPartyNameError(`이미 존재하는 그룹 이름 입니다.`, data)
    }

    const party = await getParty(partyId);
    console.log(party)
    return responseFromPartyCreate(party);
}

//그룹 멤버 조회하기
export const partyMember = async (partyId) => {
    const users = await getPartyMembers(partyId);

    if(!users){
        throw new IsThereNoMemberInPartyError('파티에 사용자가 없습니다.', partyId);
    }

    return responseFromPartyMembers(users);
}
