import { Auth as AuthActions } from '../../page-actions/page-actions';
import { Auth as AuthPage } from '../../page-objects/page-objects';

const authPage = new AuthPage();
const authActions = new AuthActions();

describe('Sign Up Form', async () => {
  before(async () => {
    await authActions.openSignUpPage();
  });

  it('should have full name field', async () => {
    await authPage.FullName_Field.waitForExist();
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

  it('should have link to sign in', async () => {
    await authActions.openSignInForm();
  });
});
