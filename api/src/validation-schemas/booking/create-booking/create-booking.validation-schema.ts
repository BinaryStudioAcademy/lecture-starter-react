import * as Joi from 'joi';
import {
  BookingValidationMessage,
  BookingValidationRule,
} from '~/common/enums/enums';
import { CreateBookingDto } from '~/common/types/types';

const createBooking = Joi.object<CreateBookingDto>({
  tripId: Joi.string().trim().required().messages({
    'string.empty': BookingValidationMessage.TRIP_ID_REQUIRED,
  }),
  userId: Joi.string().trim().required().messages({
    'string.empty': BookingValidationMessage.USER_ID_REQUIRED,
  }),
  guests: Joi.number()
    .min(BookingValidationRule.GUESTS_MIN_COUNT)
    .max(BookingValidationRule.GUESTS_MAX_COUNT)
    .required()
    .messages({
      'number.empty': BookingValidationMessage.GUESTS_COUNT_REQUIRED,
      'number.min': BookingValidationMessage.GUESTS_MIN_COUNT,
      'number.max': BookingValidationMessage.GUESTS_MAX_COUNT,
    }),
  date: Joi.date().greater('now').required().messages({
    'date.empty': BookingValidationMessage.DATE_REQUIRED,
    'date.base': BookingValidationMessage.DATE_INVALID,
    'date.strict': BookingValidationMessage.DATE_INVALID,
    'date.greater': BookingValidationMessage.DATE_GREATER_THAN,
  }),
});

export { createBooking };
