
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


export class ExsistsCompleteMission extends Error{
    errorCode = 'CM001';

    constructor(reason,data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}