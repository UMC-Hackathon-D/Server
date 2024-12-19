
//파티 생성 시 존재하는 이름일 경우
export class ExsistsPartyNameError extends Error {
    errorCode = 'P001';

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}