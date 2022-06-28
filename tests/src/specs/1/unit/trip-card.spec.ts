import { AppRoute } from '../../../common/enums/enums';
import { waitForURL } from '../../../helpers/helpers';
import { Main as MainActions } from '../../../page-actions/page-actions';
import { TripCard as TripCardComponent } from '../../../page-components/page-components';

const tripCardComponent = new TripCardComponent();
const mainActions = new MainActions();

describe('Trip Card', async () => {
  before(async () => {
    await mainActions.openPage();
  });

  it('should have title', async () => {
    await tripCardComponent.Title_Content.waitForExist();
  });

  it('should have image', async () => {
    await tripCardComponent.Image_Content.waitForExist();
  });

  it('should have duration', async () => {
    await tripCardComponent.Duration_Content.waitForExist();
  });

  it('should have level', async () => {
    await tripCardComponent.Level_Content.waitForExist();
  });

  it('should have price', async () => {
    await tripCardComponent.Price_Content.waitForExist();
  });

  it('should have discover a trip button', async () => {
    await mainActions.goToTripPage();
    await waitForURL(AppRoute.TRIP_$ID);
  });
});
