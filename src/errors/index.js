// General errors
const InvalidData = class InvalidData extends Error { }
InvalidData.errorCode = 'INVALID_DATA'
exports.InvalidData = InvalidData

const UnknownError = class UnknownError extends Error { }
UnknownError.errorCode = 'UNKNOWN_ERROR'
exports.UnknownError = UnknownError

// Auth and ID errors
const UnauthorizedError = class UnauthorizedError extends Error { }
UnauthorizedError.errorCode = 'UNAUTHORIZED_ERROR'
exports.UnauthorizedError = UnauthorizedError

const InvalidEmailOrPasswordError = class InvalidEmailOrPasswordError extends Error { }
InvalidEmailOrPasswordError.errorCode = 'INVALID_EMAIL_OR_PASSWORD'
exports.InvalidEmailOrPasswordError = InvalidEmailOrPasswordError

const EmailRegisteredError = class EmailRegisteredError extends Error { }
EmailRegisteredError.errorCode = 'EMAIL_REGISTERED'
exports.EmailRegisteredError = EmailRegisteredError

const PasswordDoesNotExist = class PasswordDoesNotExist extends Error { }
PasswordDoesNotExist.errorCode = 'PASSWORD_DOES_NOT_EXIST'
exports.PasswordDoesNotExist = PasswordDoesNotExist