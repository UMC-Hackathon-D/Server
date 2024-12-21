

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

// 미션 후기 상세 조회 요청 DTO
export const reviewToCollection = async (params) =>{
    return{
        partyId: parseInt(params.partyId),
        CMId: parseInt(params.CMId)
    }
}

// 미션 후기 상세 조회 전송 DTO
export const responseFromReview = async (data) =>{
    return{
        missionName: data.mission.missionContent,
        review: data.completeMission.review,
        fromUserName: data.fromUser.name,
        targetUserName: data.targetUser.name,
        photo: data.completeMission.photo,
        userCharacter: data.fromUserCharacters.photo,
        createAt: data.completeMission.createAt
    }
}

// 미션 후기 수정 요청 DTO
export const reviewToUpdate = async (body, params,file) =>{
    return{
        CMId: parseInt(params.CMId),
        review: body.review,
        photo: `https://test-umc-7th.s3.ap-northeast-2.amazonaws.com/${file.key}`
    }
}

// 미션 후기 수정 전송 DTO
export const responseFromReviewUpdate = async (data)=>{
    return{
        CMId: parseInt(data.id),
        review: data.review,
        photo: data.photo,
        updateAt: data.updateAt,
    }
}

// 미션 후기 삭제 요청 DTO
export const reviewToDelete = async (params) =>{
    return{
        CMId: parseInt(params.CMId)
    }
}

//미션 후기 삭제 전송 DTO
export const responseFromReviewDelete = async (data) =>{
    return{
        CMId: parseInt(data.id),
        review: data.review,
        photo: data.photo,
    }
}