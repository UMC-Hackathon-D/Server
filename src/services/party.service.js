import {responseFromPartyCreate} from "../dtos/party.dto.js";
import {addParty, getParty} from "../repositories/party.repository.js";
import {ExsistsPartyNameError} from "../error.js";

// 그룹 생성하기
export const partyCreate = async (data)=>{
    const partyId = await addParty(data);

    if(partyId === null){
        throw new ExsistsPartyNameError(`이미 존재하는 그룹 이름 입니다.`, data)
    }

    const party = await getParty(partyId);

    return responseFromPartyCreate(party);
}
