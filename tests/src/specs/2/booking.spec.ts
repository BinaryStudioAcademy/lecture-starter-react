import { authData, bookingData } from '../../data/data';
import {
  Auth as AuthActions,
  Main as MainActions,
  Trip as TripActions,
  Bookings as BookingsActions,
} from '../../page-actions/page-actions';
import { BookingCard as BookingCardComponent } from '../../page-components/page-components';
import { ApiPath, ENV, HttpMethod } from '../../common/enums/enums';
import { generateEmail } from '../../helpers/helpers';

const bookingCardComponent = new BookingCardComponent();
const authActions = new AuthActions();
const mainActions = new MainActions();
const tripActions = new TripActions();
const bookingsActions = new BookingsActions();

const email = generateEmail();

describe('User', async () => {
  before(async () => {
    const { fullName, password } = authData;

    await authActions.openSignUpPage();
    await authActions.signUp({
      fullName,
      email,
      password,
    });
    await browser.pause(2000);
  });

  it('can book a trip', async () => {
    const { guests, date } = bookingData;

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await browser.pause(2000);
    await bookingsActions.openPage();
    await bookingCardComponent.Element_Container.waitForExist();
  });

  it('can cancel a booking', async () => {
    await bookingsActions.cancelBooking();
    await bookingCardComponent.Element_Container.waitForExist({
      reverse: true,
    });
  });

  it('cannot submit form when date is in the past', async () => {
    const { invalidDate: date, guests } = bookingData;
    const mockBookTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.POST },
    );

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });

    expect(mockBookTrip.calls.length).toEqual(0);
  });

  it('cannot submit form when number of guests is invalid', async () => {
    const { invalidGuests: guests, date } = bookingData;
    const mockBookTrip = await browser.mock(
      `${ENV.API_PATH}${ApiPath.BOOKINGS}`,
      { method: HttpMethod.POST },
    );

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });

    expect(mockBookTrip.calls.length).toEqual(0);
  });
});
