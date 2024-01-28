enum ReasonType {
  GENERIC_ERROR = 'A generic error has occurred',
  USER_NOT_FOUND = 'User not found!',
  COURSE_NOT_FOUND = 'Course not found!',
  DECLARATION_NOT_FOUND = 'Declaration not found!',
  GRADING_SYSTEM_NOT_FOUND = 'Grading system not found!',
  CERTIFICATE_NOT_FOUND = 'Certificate not found!',
  PASSWORD_FORMAT = 'Password must be at least 8 characters',
  PASSWORD_MATCH = 'Passwords do not match',
  UNAUTHORIZED = 'Unauthorized',
  NO_PERMISSION = 'User has no permission',
  INVALID_CREDENTIALS = 'Invalid username or password'
}

export default ReasonType
