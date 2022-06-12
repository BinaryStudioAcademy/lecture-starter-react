import { match } from 'node-match-path';

const waitForURL = async (expectedPath: string): Promise<void> => {
  await browser.waitUntil(
    async () => {
      const url = await browser.getUrl();
      const { pathname } = new URL(url);

      return match(expectedPath, pathname).matches;
    },
    { timeoutMsg: `Expected route to match ${expectedPath}` },
  );
};

export { waitForURL };
