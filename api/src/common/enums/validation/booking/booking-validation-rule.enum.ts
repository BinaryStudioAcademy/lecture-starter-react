const BookingValidationRule = {
  GUESTS_MIN_COUNT: 1,
  GUESTS_MAX_COUNT: 10,
  DATE_GREATER_THEN: 'now',
} as const;

export { BookingValidationRule };
