import { authData } from '../../data/data';
import {
  Auth as AuthActions,
  Main as MainActions,
  Trip as TripActions,
} from '../../page-actions/page-actions';
import {
  ApiPath,
  AppRoute,
  ENV,
  HttpCode,
  HttpMethod,
} from '../../common/enums/enums';
import { generateEmail, waitForURL } from '../../helpers/helpers';
import { Loader as LoaderComponent } from '../../page-components/page-components';
import { getTripResponse } from '../../fixtures/fixtures';

const loaderComponent = new LoaderComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();
const tripActions = new TripActions();

const email = generateEmail();

describe('User', async () => {
  before(async () => {
    const { fullName, password } = authData;
    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);
  });

  it('should see loader while user data loading', async () => {
    await browser.refresh();
    await loaderComponent.Element_Container.waitForDisplayed();
  });

  it('should stay on the same page after reload', async () => {
    const mockGetTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.TRIPS_$ID}`,
      {
        method: HttpMethod.GET,
      },
    );
    mockGetTrip.respond(getTripResponse, {
      statusCode: HttpCode.OK,
    });

    const { id } = getTripResponse;
    await tripActions.openPage(id);
    await browser.refresh();
    await waitForURL(AppRoute.TRIP_$ID.replace(':id', id));
  });

  it('should be redirected to main page on unknown route', async () => {
    await browser.url(AppRoute.UNKNOWN_ROUTE);
    await waitForURL(AppRoute.MAIN);
  });

  it('should be redirected to sign in page when unathorized', async () => {
    await mainActions.signOut();
    await browser.url(AppRoute.MAIN);
    await waitForURL(AppRoute.SIGN_IN);
  });

  it('should be signed out when 401 error occures', async () => {
    const { password } = authData;

    const mockLoadTrips = await browser.mock(
      `${ENV.API_PATH}${ApiPath.TRIPS}`,
      {
        method: HttpMethod.GET,
      },
    );
    mockLoadTrips.respond([], {
      statusCode: HttpCode.UNAUTHORIZED,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await waitForURL(AppRoute.SIGN_IN);
  });
});
