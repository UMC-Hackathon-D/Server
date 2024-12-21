// 낭만모음집 조회시 완료된 미션이 없는 경우
export class ExsistsCompleteMission extends Error{
    errorCode = 'CM001';

    constructor(reason,data) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 400;
    }
}

