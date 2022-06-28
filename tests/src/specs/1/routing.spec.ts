import { AppRoute } from '../../common/enums/enums';
import { waitForURL } from '../../helpers/helpers';

describe('User', async () => {
  it('should be redirected to main page on unknown route', async () => {
    await browser.url(AppRoute.UNKNOWN_ROUTE);
    await waitForURL(AppRoute.MAIN);
  });
});
