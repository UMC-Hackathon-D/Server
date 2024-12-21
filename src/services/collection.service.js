import {responseFromCollections, responseFromReview} from "../dtos/collection.dto.js";
import {
    getCharacter,
    getCollection,
    getCompleteMission, getMission,
    getMissionStartTime,
    getPartyUsers, getUserInfo, getUserMission
} from "../repositories/collection.repository.js";
import {getParty} from "../repositories/party.repository.js";
import {ExsistsCompleteMission} from "../errors/collection.error.js";



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

// 미션 후기 상세 조회
export const showReview = async (data) => {
    const resolveData = await data;

    const completeMission = await getCompleteMission(resolveData.CMId);

    // 완료한 미션의 CMId를 통해서 유저 미션 정보 가저오기
    const userMissionInfo = await getUserMission(completeMission.userMissionId);
    
    // 미션 내용 가져오기
    const mission = await getMission(userMissionInfo.missionId);
    
    // 유저의 정보를 가져오기
    const fromUser = await getUserInfo(userMissionInfo.missionUserId);

    // 유저의 캐릭터 가져오기
    const fromUserCharacters = await getCharacter(fromUser.characterId);

    //타겟 유저를 가져오기
    const targetUser = await getUserInfo(userMissionInfo.targetUserId);

    return responseFromReview({completeMission,mission,fromUser, fromUserCharacters,targetUser});
}