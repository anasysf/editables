export default class ResponseError extends Error {
  private readonly _status: number;
  private readonly _message: string;
  private readonly _url: string;

  public constructor(status: number, message: string, url: string) {
    super(message);

    this._status = status;
    this._message = message;
    this._url = url;
  }

  public get status(): number {
    return this._status;
  }

  public get message(): string {
    return this._message;
  }

  public get url(): string {
    return this._url;
  }
}
