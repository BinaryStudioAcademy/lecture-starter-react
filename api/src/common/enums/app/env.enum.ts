import { config } from 'dotenv';

config();

const { PORT, HOST, SECRET_KEY, DB_CONNECTION_STRING } = process.env;

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
  DB: {
    CONNECTION_STRING: DB_CONNECTION_STRING as string,
  },
} as const;

export { ENV };
