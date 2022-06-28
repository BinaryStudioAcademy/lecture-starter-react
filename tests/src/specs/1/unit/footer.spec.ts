import { Footer as FooterComponent } from '../../../page-components/page-components';
import {
  Auth as AuthActions,
  Main as MainActions,
} from '../../../page-actions/page-actions';

const footerComponent = new FooterComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();

describe('Footer', async () => {
  it('should be visible on main page', async () => {
    await mainActions.openPage();
    await footerComponent.Element_Container.waitForExist();
  });

  it('should be visible on sign in page', async () => {
    await authActions.openSignInPage();
    await footerComponent.Element_Container.waitForExist();
  });
});
