import { generateEmail } from '../../helpers/helpers';
import { authData, mainData } from '../../data/data';
import {
  Main as MainActions,
  Auth as AuthActions,
} from '../../page-actions/page-actions';
import { Main as MainPage } from '../../page-objects/page-objects';
import { ApiPath, ENV, HttpCode, HttpMethod } from '../../common/enums/enums';
import { getTripsResponse } from '../../fixtures/fixtures';

const mainPage = new MainPage();
const authActions = new AuthActions();
const mainActions = new MainActions();

const email = generateEmail();

describe('User', async () => {
  before(async () => {
    const mockGetTrips = await browser.mock(`${ENV.API_PATH}${ApiPath.TRIPS}`, {
      method: HttpMethod.GET,
    });
    mockGetTrips.respond(getTripsResponse, {
      statusCode: HttpCode.OK,
    });

    const { fullName, password } = authData;
    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);
    await mainActions.openPage();
  });

  it('can filter cards by search', async () => {
    const { search } = mainData;

    const expectedTrips = getTripsResponse.filter(
      ({ title }) => title.search(search) !== -1,
    );
    await mainActions.searchByTitle(search);
    const tripsLength = await mainPage.TripCards.length;

    expect(tripsLength).toEqual(expectedTrips.length);
  });

  it('can filter cards by level', async () => {
    const { level } = mainData;

    const expectedTrips = getTripsResponse.filter(
      ({ level: tripLevel }) => tripLevel === level,
    );
    await mainActions.selectLevel(level);
    const tripsLength = await mainPage.TripCards.length;

    expect(tripsLength).toEqual(expectedTrips.length);
  });

  it('can filter cards by duration', async () => {
    const { duration } = mainData;
    const range = duration.split('_x_');

    const expectedTrips = getTripsResponse.filter(
      ({ duration: tripDuration }) =>
        tripDuration >= +range[0] && tripDuration < +range[1],
    );
    await mainActions.selectDuration(duration);
    const tripsLength = await mainPage.TripCards.length;

    expect(tripsLength).toEqual(expectedTrips.length);
  });
});
