import { config } from 'dotenv';

config();

const { API_ORIGIN_URL } = process.env;

const ENV = {
  API_PATH: API_ORIGIN_URL as string,
} as const;

export { ENV };
