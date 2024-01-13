export class Exception extends Error {
  public readonly name: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(name?: string, message?: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode;
    this.name = name;

    Error.captureStackTrace(this);
  }
}
