import {prisma} from "../db.config.js";


//해당 파티에 등록된 파티원들을 가져온다.
export const getPartyUsers = async(partyId)=>{
    const users = await prisma.user.findMany({
        where: {
            partyId: partyId,
        },
        select:{
            id: true,
            partyId: true,
            name: true
        }
    });
    return users;
}

//해당 유저의 완료된 미션 후기 가져오기
export const getCollection = async(userId) =>{
    console.log(`userId: ${userId}`);
    const userMissionInfo = await prisma.UserMission.findFirst({
        where: {
            missionUserId: userId,
            status: "completed",
        },
        select: {
            id:true,
            missionId: true,
            targetUserId: true,
        }
    });

    console.log(userMissionInfo);
    //status가 in_progress일 경우를 말함
    if(!userMissionInfo){
        return null;
    }

    // 사용자 이름
    const fromUserName = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select:{
            name:true,
            characterId:true
        }
    })

    const characterInfo = await prisma.Character.findFirst({
        where: {
            id: fromUserName.characterId
        },
        select:{
            photo:true
        }
    })


    // 타겟유저의 이름
    const targetUserName = await prisma.user.findFirst({
        where: {
            id: userMissionInfo.targetUserId,
        },
        select:{
            name:true
        }
    })
    
    // 완료된 미션 후기 정보
    const completeMission = await prisma.completeMission.findFirst({
        where: {userMissionId: userMissionInfo.id},
        select: {
            id:true,
            photo:true,
            review: true,
            createAt: true
        }
    })
    //미션 내용
    const mission = await prisma.mission.findFirst({
        where: {
            id: userMissionInfo.missionId,
        },
        select:{
            missionContent:true
        }
    })

    // 미션은 완료했지만 완료된 미션 후기를 작성안했을경우
    if(!completeMission){
        return null;
    }


    return {
        CMId: completeMission.id,
        photo: completeMission.photo,
        review:completeMission.review,
        createAt: completeMission.createAt,
        missionName: mission.missionContent,
        fromUserName: fromUserName.name,
        targetUserName: targetUserName.name,
        userCharacter: characterInfo.photo
    };
}

//해당 유저의 미션을 시작한 시간 조회 
export const getMissionStartTime = async(userId) =>{
    const userMissionInfo = await prisma.userMission.findFirst({where: {missionUserId: userId}});
    const status = userMissionInfo.status;

    if(status !== 'in_progress'){
        return null;
    }
    const startTime = userMissionInfo.createAt;

    return startTime;
}

// 완료된 미션을 가져오기
export const getCompleteMission = async(CMId) =>{
    console.log(CMId)
    const completeMission = await prisma.completeMission.findFirst({
        where:{id: CMId},
    })

    console.log(completeMission);
    return completeMission;
}

// 유저의 미션 정보 가져오기
export const getUserMission = async(userMissionId) =>{
    const userMission = await prisma.userMission.findFirst({
        where: {id: userMissionId}
    })
    return userMission;
}

// 미션 내용 가져오기
export const getMission = async(missionId) =>{
    const mission = await prisma.mission.findFirst({
        where: {id: missionId},
    })
    return mission;
}

// 유저 정보 가져오기
export const getUserInfo = async(userId) =>{
    const user = await prisma.user.findFirst({
        where: {id: userId},
    })
    return user;
}

// 유저의 캐릭터 사진 가져오기
export const getCharacter = async(characterId) =>{
    const result = await prisma.Character.findFirst({ where: {id: characterId}});
    return result;
}