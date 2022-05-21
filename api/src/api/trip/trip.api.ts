import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { HttpCode, HttpMethod, TripsApiPath } from '~/common/enums/enums';
import { Trip as TripService } from '~/services/services';

type Options = {
  services: {
    trip: TripService;
  };
};

const initTripApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
  const { trip: tripService } = opts.services;

  fastify.route({
    method: HttpMethod.GET,
    url: TripsApiPath.ROOT,
    handler: async (_req, rep) => {
      const trips = await tripService.getAll();

      return rep.status(HttpCode.OK).send(trips);
    },
  });

  fastify.route({
    method: HttpMethod.GET,
    url: TripsApiPath.$ID,
    handler: async (req: FastifyRequest<{ Params: { id: string } }>, rep) => {
      const { id } = req.params;

      const trip = await tripService.getById(id);

      return rep.status(HttpCode.OK).send(trip);
    },
  });
};

export { initTripApi };
