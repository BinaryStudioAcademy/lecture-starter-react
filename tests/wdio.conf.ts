import type { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

const { APP_URL } = process.env;

const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },
  specs: ['./src/specs/**/*.spec.ts'],
  suites: {
    part_1: ['./src/specs/1/**'],
    part_2: ['./src/specs/2/**'],
  },
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: APP_URL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};

export { config };
