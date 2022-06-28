import { AppRoute } from '../../common/enums/enums';
import { authData } from '../../data/data';
import { generateEmail, waitForURL } from '../../helpers/helpers';
import { Main as MainPage } from '../../page-objects/main.page-object';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../page-actions/page-actions';

const mainPage = new MainPage();
const authActions = new AuthActions();
const mainActions = new MainActions();

const email = generateEmail();

describe('User', async () => {
  it('should be navigated to main page on sign in', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await waitForURL(AppRoute.MAIN);
  });

  it('should be navigated to main page on sign up', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await waitForURL(AppRoute.MAIN);
  });

  it('should be navigated to sign in page on sign out', async () => {
    await mainActions.openPage();
    await mainActions.signOut();

    await waitForURL(AppRoute.SIGN_IN);
  });

  it('cannot submit sign in form when email is missing', async () => {
    const { password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email: '',
      password,
    });
    await mainPage.SearchBar_Field.waitForExist({ reverse: true });
  });

  it('cannot submit sign in form when password is invalid', async () => {
    const { invalidPassword: password } = authData;

    await authActions.openSignInPage();
    await authActions.signIn({
      email,
      password,
    });
    await mainPage.SearchBar_Field.waitForExist({ reverse: true });
  });

  it('cannot submit sign up form when email is missing', async () => {
    const { fullName, password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email: '',
      password,
    });
    await mainPage.SearchBar_Field.waitForExist({ reverse: true });
  });

  it('cannot submit sign up form when password is invalid', async () => {
    const { fullName, invalidPassword: password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await mainPage.SearchBar_Field.waitForExist({ reverse: true });
  });
});
