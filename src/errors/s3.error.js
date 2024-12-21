export class WrongFileExtensionError extends Error {
  errorCode = "S001";

  constructor(reason = "허용되지 않는 파일 확장자입니다", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 400;
  }
}
