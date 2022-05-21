import { BookingValidationRule } from './booking-validation-rule.enum';

const BookingValidationMessage = {
  TRIP_ID_REQUIRED: 'Trip id is required',
  USER_ID_REQUIRED: 'User id is required',
  GUESTS_COUNT_REQUIRED: 'Guests count is required',
  GUESTS_MIN_COUNT: `Guests count must be greater than or equal to ${BookingValidationRule.GUESTS_MIN_COUNT}`,
  GUESTS_MAX_COUNT: `Guests count must be less than or equal to ${BookingValidationRule.GUESTS_MAX_COUNT}`,
  DATE_REQUIRED: 'Date is required',
  DATE_INVALID: 'Date format is invalid',
  DATE_GREATER_THAN: 'Date must be in the future',
} as const;

export { BookingValidationMessage };
