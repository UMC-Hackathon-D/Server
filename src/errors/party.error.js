export class PartyNotFoundError extends Error {
  errorCode = "P001";

  constructor(reason = "Party not found", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 404;
  }
}

export class DuplicatePartyUserNameError extends Error {
  errorCode = "P002";

  constructor(reason = "User name already exists in this party", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 409;
  }
}

export class PartyMemberLimitExceededError extends Error {
  errorCode = "P003";

  constructor(reason = "Party has reached maximum member limit", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 400;
  }
}

export class InvalidPartyPasswordError extends Error {
  errorCode = "P004";

  constructor(reason = "Invalid party password", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 401;
  }
}


//파티 생성 시 존재하는 이름일 경우
export class ExsistsPartyNameError extends Error {
  errorCode = 'P006';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 400;
  }
}
