import { ApiPath, AppRoute, ENV, HttpMethod } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, waitForURL } from '../../helpers/helpers';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';

const authActions = new AuthActions();
const mainActions = new MainActions();

const email = generateEmail();

describe('User', async () => {
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
    await waitForURL(AppRoute.MAIN);
  });

  it('can sign in', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
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
    await mainActions.signOut();
    await waitForURL(AppRoute.SIGN_IN);
  });

  it('cannot submit form when email is missing', async () => {
    const { password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email: '',
      password,
    });

    expect(mockSignIn.calls.length).toEqual(0);
  });

  it('cannot submit form when password is invalid', async () => {
    const { invalidPassword: password } = authData;
    const mockSignIn = await browser.mock(`${ENV.API_PATH}${ApiPath.SIGN_IN}`, {
      method: HttpMethod.POST,
    });

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });

    expect(mockSignIn.calls.length).toEqual(0);
  });
});
