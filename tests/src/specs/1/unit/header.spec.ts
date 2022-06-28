import { Header as HeaderComponent } from '../../../page-components/page-components';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../../page-actions/page-actions';
import { waitForURL } from '../../../helpers/helpers';
import { AppRoute } from '../../../common/enums/enums';

const headerComponent = new HeaderComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Header', async () => {
  it('should not have navigation on sign in page', async () => {
    await authActions.openSignInPage();
    await headerComponent.Navigation_Container.waitForExist({ reverse: true });
  });

  it('should have navigation on main page', async () => {
    await mainActions.openPage();
    await headerComponent.Navigation_Container.waitForExist();
  });

  it('should navigate to main page on logo click', async () => {
    await authActions.openSignInPage();
    await headerComponent.Logo_Link.waitForClickable();
    await headerComponent.Logo_Link.click();
    await waitForURL(AppRoute.MAIN);
  });

  it('should show profile navigation on profile item hover', async () => {
    await mainActions.openPage();
    await mainActions.openProfileNav();
    await headerComponent.ProfileMenu_Container.waitForDisplayed();
  });

  it('profile navigation should have username', async () => {
    await mainActions.openPage();
    await mainActions.openProfileNav();
    await headerComponent.ProfileUsername_MenuItem.waitForDisplayed();
  });
});
