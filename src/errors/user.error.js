//파티에 존재하지 않는 사용자일 경우
export class ExsistsPartyToUserError extends Error {
  errorCode = "U001";

  constructor(reason) {
    super(reason);
    this.reason = reason;
    this.statusCode = 400;
  }
}

// 사용자 이름 변경시 이미 존재하는 이름일때
export class ExistUserNameError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
  }
}

export class UserNotFoundError extends Error {
  errorCode = "U003";

  constructor(reason = "User Not Found", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 404;
  }
}
