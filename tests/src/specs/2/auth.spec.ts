import { ApiPath, AppRoute, ENV, HttpMethod } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, waitForURL, wakeUpApi } from '../../helpers/helpers';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';

const authActions = new AuthActions();
const mainActions = new MainActions();

const email = generateEmail();

describe('User', async () => {
  before(wakeUpApi);

  afterEach(async () => {
    await browser.reloadSession();
  });

  it('can sign up', async () => {
    const { fullName, password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);
  });

  it('can sign in', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);
  });

  it('can sign out', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await browser.pause(2000);
    await waitForURL(AppRoute.MAIN);
    await mainActions.signOut();
    await waitForURL(AppRoute.SIGN_IN);
  });

  it('cannot submit sign up form when email is missing', async () => {
    const { fullName, password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email: '',
      password,
    });
    await browser.pause(2000);

    expect(mockSignIn.calls.length).toEqual(0);
  });

  it('cannot submit sign up form when password is invalid', async () => {
    const { fullName, invalidPassword: password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_UP}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);

    expect(mockSignIn.calls.length).toEqual(0);
  });
});
