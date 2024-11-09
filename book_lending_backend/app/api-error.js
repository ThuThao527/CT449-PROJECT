// api-error.js
class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Lỗi 400 - Bad Request
class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

// Lỗi 401 - Unauthorized
class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

// Lỗi 403 - Forbidden
class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

// Lỗi 404 - Not Found
class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

// Lỗi 409 - Conflict
class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

// Lỗi 500 - Internal Server Error
class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

// Lỗi 502 - Bad Gateway
class BadGatewayError extends ApiError {
  constructor(message = 'Bad Gateway') {
    super(502, message);
  }
}

// Lỗi 503 - Service Unavailable
class ServiceUnavailableError extends ApiError {
  constructor(message = 'Service Unavailable') {
    super(503, message);
  }
}

// Lỗi 504 - Gateway Timeout
class GatewayTimeoutError extends ApiError {
  constructor(message = 'Gateway Timeout') {
    super(504, message);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
};
