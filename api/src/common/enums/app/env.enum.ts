import { config } from 'dotenv';

config();

const { PORT, HOST, SECRET_KEY } = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST as string,
  },
  API: {
    V1_PREFIX: '/api/v1',
    DOCUMENTATION_PREFIX: '/documentation',
  },
  JWT: {
    SECRET: SECRET_KEY as string,
    EXPIRES_IN: '24h',
  },
} as const;

export { ENV };
