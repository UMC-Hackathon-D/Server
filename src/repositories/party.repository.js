import {prisma} from "../db.config.js";

//그룹(파티) 생성하기
export const addParty = async (data) => {
    const party = await prisma.party.findFirst({where: {partyName: data.partyName}});

    if(party) {
        return null;
    }
    console.log(data);
    // 파티 생성
    const createdParty = await prisma.party.create({
        data:{
            partyName: data.partyName,
            numMember: data.numMember,
            password: data.password,
            createAt : new Date(),
            updateAt : new Date()
        }
    });

    // 유저 생성
    const createUser = await prisma.user.create({
        data:{
            name: data.name,
            partyId : createdParty.id,
            createAt: new Date(),
            updateAt: new Date()
        }
    })

    return createdParty.id;
}


//생성된 그룹(파티) 정보 조회
export const getParty = async (partyId)=>{
    const party = await prisma.party.findFirst({where: {id: partyId}});
    return party;
}