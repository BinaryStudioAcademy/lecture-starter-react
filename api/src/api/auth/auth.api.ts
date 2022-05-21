import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { CreateUserDto, SignInUserDto } from '~/common/types/types';
import { HttpCode, HttpMethod, AuthApiPath } from '~/common/enums/enums';
import { Auth as AuthService, User as UserService } from '~/services/services';
import {
  signInUser as signInUserValidationSchema,
  signUpUser as signUpUserValidationSchema,
} from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    auth: AuthService;
    user: UserService;
  };
};

const initAuthApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth: authService, user: userService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: AuthApiPath.AUTHENTICATED_USER,
    async handler(req, rep) {
      return rep.status(HttpCode.OK).send(req.user);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_UP,
    schema: {
      body: signUpUserValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: CreateUserDto }>, rep) {
      const user = await authService.signUp(req.body);

      return rep.status(HttpCode.CREATED).send(user);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: AuthApiPath.SIGN_IN,
    schema: {
      body: signInUserValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: SignInUserDto }>, rep) {
      const { id } = await userService.verifyLoginCredentials(req.body);
      const user = await authService.signIn(id);

      return rep.status(HttpCode.OK).send(user);
    },
  });
};

export { initAuthApi };
