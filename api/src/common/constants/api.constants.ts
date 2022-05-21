import { ApiPath, AuthApiPath, ENV } from '~/common/enums/enums';

const WHITE_ROUTES = [
  new RegExp(`${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`),
  new RegExp(`${ENV.API.V1_PREFIX}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`),
];

export { WHITE_ROUTES };
