export class MissionNotFoundError extends Error {
  errorCode = "M001";

  constructor(reason = "Mission not found", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 404;
  }
}

export class MissionNotOngoingError extends Error {
  errorCode = "M002";

  constructor(reason = "Mission is not in ongoing status", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 400;
  }
}
