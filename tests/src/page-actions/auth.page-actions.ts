import { AppRoute } from '../common/enums/enums';
import { SignInUserPayload, SignUpUserPayload } from '../common/types/types';
import { Auth as AuthPage } from '../page-objects/page-objects';

const authPage = new AuthPage();

class Auth {
  async openSignInPage(): Promise<void> {
    await browser.url(AppRoute.SIGN_IN);
  }

  async openSignUpPage(): Promise<void> {
    await browser.url('/sign-up');
  }

  async openSignUpForm(): Promise<void> {
    await authPage.SignUp_Link.waitForClickable();
    await authPage.SignUp_Link.click();
  }

  async openSignInForm(): Promise<void> {
    await authPage.SignIn_Link.waitForClickable();
    await authPage.SignIn_Link.click();
  }

  async fillSignUpForm({
    fullName,
    email,
    password,
  }: SignUpUserPayload): Promise<void> {
    await authPage.FullName_Field.waitForExist();
    await authPage.FullName_Field.setValue(fullName);

    await authPage.Email_Field.waitForExist();
    await authPage.Email_Field.setValue(email);

    await authPage.Password_Field.waitForExist();
    await authPage.Password_Field.setValue(password);
  }

  async fillSignInForm({ email, password }: SignInUserPayload): Promise<void> {
    await authPage.Email_Field.waitForExist();
    await authPage.Email_Field.setValue(email);

    await authPage.Password_Field.waitForExist();
    await authPage.Password_Field.setValue(password);
  }

  async sign(): Promise<void> {
    await authPage.Sign_Button.waitForClickable();
    await authPage.Sign_Button.click();
  }

  async signIn(payload: SignInUserPayload): Promise<void> {
    await this.fillSignInForm(payload);
    await this.sign();
  }

  async signUp(payload: SignUpUserPayload): Promise<void> {
    await this.fillSignUpForm(payload);
    await this.sign();
  }
}

export { Auth };
