import { UserDto } from '~/common/types/types';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserDto;
  }
}
