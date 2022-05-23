import path from 'path';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import { initServices } from '~/services/services';
import { initDatabase } from '~/db';

const app = Fastify({
  logger: {
    prettyPrint: true,
  },
});

app.register(cors, {
  origin: '*',
});

app.register(swagger, {
  prefix: ENV.API.DOCUMENTATION_PREFIX,
  mode: 'static',
  exposeRoute: true,
  specification: {
    path: path.resolve(__dirname, './documentation/documentation.yaml'),
    baseDir: path.resolve(__dirname, './documentation'),
  },
});

const repositories = initDatabase();
const { auth, user, trip, booking } = initServices(repositories);

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
  services: {
    auth,
    user,
    trip,
    booking,
  },
});

app.listen(ENV.APP.SERVER_PORT, ENV.APP.SERVER_HOST);
