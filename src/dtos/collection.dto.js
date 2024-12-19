

// 낭만 모음집 조회 요청 DTO
export const collectionToParty  = async (params) => {
    return{
        partyId: parseInt(params.partyId),
        userId: parseInt(params.userId)
    }
}

// 낭만 모음집 조회 전송 DTO
export const responseFromCollections = async(data) =>{
    return{
        missionStartTime: data.missionStartTime,
        collections: data.collectionList,
    }
}