import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { ControllerHook, ExceptionMessage } from '~/common/enums/enums';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { Auth as AuthService } from '~/services/services';

type Options = {
  whiteRoutes: RegExp[];
  services: {
    auth: AuthService;
  };
};

const authorization: FastifyPluginAsync<Options> = fp(async (fastify, opts) => {
  const { whiteRoutes, services } = opts;
  const { auth } = services;

  fastify.addHook(ControllerHook.ON_REQUEST, async (req) => {
    const isWhiteRoute = whiteRoutes.some((route) => route.test(req.routerPath));

    if (isWhiteRoute) {
      return;
    }

    const [, token] = req.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }

    req.user = await auth.getAuthorizedUser(token);
  });
});

export { authorization };
