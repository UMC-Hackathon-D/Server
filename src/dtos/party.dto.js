
//그룹 생성 요청 DTO
export const createToParty = (body)=>{
    return {
        partyName: body.partyName,
        name: body.name,
        numMember: body.numMember,
        password: body.password
    }
}


//그룹 생성 전송 DTO
export const responseFromPartyCreate = (body)=>{
    return {
        partyId: body.id,
        partyName: body.partyName,
        numMember: body.numMember,
        password: body.password
    }
}