import { Main as MainPage } from '../page-objects/page-objects';
import { AppRoute } from '../common/enums/enums';
import {
  Header as HeaderComponent,
  TripCard as TripCardComponent,
} from '../page-components/page-components';
import { waitForURL } from '../helpers/helpers';

const mainPage = new MainPage();
const headerComponent = new HeaderComponent();

class Main {
  async openPage(): Promise<void> {
    await browser.url(AppRoute.MAIN);
  }

  async searchByTitle(search: string): Promise<void> {
    await mainPage.SearchBar_Field.waitForExist();
    await mainPage.SearchBar_Field.setValue(search);
  }

  async selectLevel(level: string): Promise<void> {
    await mainPage.Level_Dropdown.waitForExist();
    await mainPage.Level_Dropdown.selectByAttribute('value', level);
  }

  async selectDuration(duration: string): Promise<void> {
    await mainPage.Duration_Dropdown.waitForExist();
    await mainPage.Duration_Dropdown.selectByAttribute('value', duration);
  }

  async openProfileNav(): Promise<void> {
    await headerComponent.ProfileNavigation_Container.waitForExist();
    await headerComponent.ProfileNavigation_Container.moveTo();
  }

  async goToTripPage(): Promise<void> {
    const tripCardComponent = new TripCardComponent();
    await tripCardComponent.DiscoverTrip_Link.waitForClickable();
    await tripCardComponent.DiscoverTrip_Link.click();
    await waitForURL(AppRoute.TRIP_$ID);
  }

  async signOut(): Promise<void> {
    await this.openProfileNav();
    await headerComponent.ProfileSignOut_Button.waitForClickable();
    await headerComponent.ProfileSignOut_Button.click();
  }
}

export { Main };
