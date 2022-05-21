import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  FULL_NAME_REQUIRED: 'Full Name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email format is not valid',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must have at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MAX_LENGTH: `Password must have at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters`,
} as const;

export { UserValidationMessage };
