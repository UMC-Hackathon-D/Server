
//파티 생성 시 존재하는 이름일 경우
export class ExsistsPartyNameError extends Error {
    errorCode = 'P001';

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

//파티에 존재하지 않는 사용자일 경우
export class ExsistsPartyToUserError extends Error{
    errorCode = 'U001';

    constructor(reason) {
        super(reason);
        this.reason = reason;
    }
}

// 낭만모음집 조회시 완료된 미션이 없는 경우
export class ExsistsCompleteMission extends Error{
    errorCode = 'CM001';

    constructor(reason,data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 사용자 이름 변경시 이미 존재하는 이름일때
export class ExistUserNameError extends Error{
    errorCode = "U002";

    constructor(reason,data){
        super(reason);
        this.reason = reason;
    }

}