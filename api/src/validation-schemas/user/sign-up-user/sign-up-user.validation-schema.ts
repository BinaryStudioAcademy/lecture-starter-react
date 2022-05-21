import * as Joi from 'joi';
import { UserValidationMessage, UserValidationRule } from '~/common/enums/enums';
import { CreateUserDto } from '~/common/types/types';

const signUpUser = Joi.object<CreateUserDto>({
  fullName: Joi.string().trim().required().messages({
    'string.empty': UserValidationMessage.FULL_NAME_REQUIRED,
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': UserValidationMessage.EMAIL_REQUIRED,
      'string.email': UserValidationMessage.EMAIL_INVALID,
    }),
  password: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRED,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { signUpUser };
