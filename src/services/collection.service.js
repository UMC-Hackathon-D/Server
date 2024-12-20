import {responseFromCollections} from "../dtos/collection.dto.js";
import {getCollection, getMissionStartTime, getPartyUsers} from "../repositories/collection.repository.js";
import {getParty} from "../repositories/party.repository.js";
import {ExsistsCompleteMission} from "../error.js";



// 낭만 모음집 조회 로직
export const partyCollections = async (data) =>{
    const resolveData = await data;
    
    // 접속한 사용자의 미션 시작한 시간 조회(사용자의 미션이 in_progress일때만 넘어감)
    const missionStartTime = await getMissionStartTime(resolveData.userId);

    const partyInfo = await getParty(resolveData.partyId);
    const partyName = partyInfo.partyName;
    // 파티원들의 userId를 조회
    const users = await getPartyUsers(resolveData.partyId);

    let collectionList = [];
    let results = '';

    for (const user of users){
        results = await getCollection(user.id);

        // null이면 완료된 후기나, 미션이 완료되지 않았다는 것을 의미
        if(results !== null){
            collectionList.push(results);
            console.log(collectionList);
        }
    }

    const errorData = {missionStartTime, partyName};

    //모음집에 아무것도 없을때
    if(collectionList.length === 0){
        throw new ExsistsCompleteMission('완료된 미션이 없습니다.',errorData)
    }


    return responseFromCollections({missionStartTime,collectionList});
}