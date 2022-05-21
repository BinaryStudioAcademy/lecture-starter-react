import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode, HttpMethod, BookingsApiPath } from '~/common/enums/enums';
import { CreateBookingDto } from '~/common/types/types';
import { Booking as BookingService } from '~/services/services';
import { createBooking as createBookingValidationSchema } from '~/validation-schemas/validation-schemas';

type Options = {
  services: {
    booking: BookingService;
  };
};

const initBookingApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { booking: bookingService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: BookingsApiPath.ROOT,
    async handler(req, rep) {
      const { user } = req;
      const bookings = bookingService.getByUser(user.id);

      return rep.status(HttpCode.OK).send(bookings);
    },
  });

  fastify.route({
    method: HttpMethod.POST,
    url: BookingsApiPath.ROOT,
    schema: {
      body: createBookingValidationSchema,
    },
    async handler(req: FastifyRequest<{ Body: CreateBookingDto }>, rep) {
      const booking = bookingService.create(req.body);

      return rep.status(HttpCode.CREATED).send(booking);
    },
  });

  fastify.route({
    method: HttpMethod.DELETE,
    url: BookingsApiPath.$ID,
    async handler(req: FastifyRequest<{ Params: { id: string } }>, rep) {
      const { id } = req.params;

      await bookingService.delete(id);

      return rep.status(HttpCode.NO_CONTENT).send(true);
    },
  });
};

export { initBookingApi };
