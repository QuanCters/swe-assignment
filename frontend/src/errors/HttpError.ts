export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Gọi constructor của lớp Error
    this.statusCode = statusCode;

    // Cập nhật lại tên lỗi và stack trace nếu cần
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
