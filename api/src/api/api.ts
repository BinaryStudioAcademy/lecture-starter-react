import { FastifyPluginAsync } from 'fastify';
import { WHITE_ROUTES } from '~/common/constants/constants';
import { ValidationSchema } from '~/common/types/types';
import { ApiPath } from '~/common/enums/enums';
import { authorization as authorizationPlugin } from '~/plugins/plugins';
import {
  Auth as AuthService,
  Booking as BookingService,
  Trip as TripService,
  User as UserService,
} from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initTripApi } from './trip/trip.api';
import { initBookingApi } from './booking/booking.api';

type Options = {
  services: {
    auth: AuthService;
    user: UserService;
    trip: TripService;
    booking: BookingService;
  };
};

const initApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { auth, user, trip, booking } = opts.services;

  fastify.setValidatorCompiler<ValidationSchema>(({ schema }) => {
    return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
      return schema.validate(data);
    };
  });

  fastify.register(authorizationPlugin, {
    services: {
      auth,
    },
    whiteRoutes: WHITE_ROUTES,
  });

  fastify.register(initAuthApi, {
    services: {
      auth,
      user,
    },
    prefix: ApiPath.AUTH,
  });

  fastify.register(initTripApi, {
    services: {
      trip,
    },
    prefix: ApiPath.TRIPS,
  });

  fastify.register(initBookingApi, {
    services: {
      booking,
    },
    prefix: ApiPath.BOOKINGS,
  });
};

export { initApi };
