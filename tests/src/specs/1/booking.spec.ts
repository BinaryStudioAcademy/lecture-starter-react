import { bookingData } from '../../data/data';
import {
  BookTripModal,
  Header as HeaderComponent,
} from '../../page-components/page-components';
import {
  Main as MainActions,
  Trip as TripActions,
  Bookings as BookingsActions,
} from '../../page-actions/page-actions';
import { Bookings as BookingsPage } from '../../page-objects/page-objects';

const headerComponent = new HeaderComponent();
const bookTripModalComponent = new BookTripModal();
const bookingsPage = new BookingsPage();
const mainActions = new MainActions();
const tripActions = new TripActions();
const bookingsActions = new BookingsActions();

describe('User', async () => {
  it('can submit trip form when fields are valid', async () => {
    const { guests, date } = bookingData;

    await bookingsActions.openPage();

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await bookTripModalComponent.Element_Container.waitForDisplayed({
      reverse: true,
    });
  });

  it('can cancel a booking', async () => {
    await bookingsActions.openPage();
    const bookingsCount = await bookingsPage.Items.length;

    await bookingsActions.cancelBooking();
    const newBookingsCount = await bookingsPage.Items.length;

    expect(newBookingsCount).toEqual(bookingsCount - 1);
  });

  it('cannot submit trip form when date is in the past', async () => {
    const { invalidDate: date, guests } = bookingData;

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });

  it('cannot submit trip form when number of guests is invalid', async () => {
    const { invalidGuests: guests, date } = bookingData;

    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.bookTrip({
      date,
      guests,
    });
    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });
});
