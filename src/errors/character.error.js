export class CharacterNotFoundError extends Error {
  errorCode = "C001";

  constructor(reason = "Character not found", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = 404;
  }
}
