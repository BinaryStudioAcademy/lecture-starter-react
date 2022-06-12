import { Auth as AuthActions } from '../../page-actions/page-actions';
import { Auth as AuthPage } from '../../page-objects/page-objects';

const authPage = new AuthPage();
const authActions = new AuthActions();

describe('Sign In Form', async () => {
  before(async () => {
    await authActions.openSignInPage();
  });

  it('should have email field', async () => {
    await authPage.Email_Field.waitForExist();
  });

  it('should have password field', async () => {
    await authPage.Password_Field.waitForExist();
  });

  it('should have submit button', async () => {
    await authPage.Sign_Button.waitForExist();
  });

  it('should have link to sign up', async () => {
    await authActions.openSignUpForm();
  });
});
