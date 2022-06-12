import { Bookings as BookingsPage } from '../../page-objects/bookings.page-object';
import { BookingCard as BookingCardComponent } from '../../page-components/page-components';
import { Bookings as BookingsActions } from '../../page-actions/page-actions';

const bookingsPage = new BookingsPage();
const bookingCardComponent = new BookingCardComponent();
const bookingsActions = new BookingsActions();

describe('Booking Card', async () => {
  before(async () => {
    await bookingsActions.openPage();
  });

  it('should have title', async () => {
    await bookingCardComponent.Title_Content.waitForExist();
  });

  it('should have date', async () => {
    await bookingCardComponent.Date_Content.waitForExist();
  });

  it('should have number of guests', async () => {
    await bookingCardComponent.Guests_Content.waitForExist();
  });

  it('should have final price', async () => {
    await bookingCardComponent.Total_Content.waitForExist();
  });

  it('should remove item from the list on cancel button click', async () => {
    const bookingCardsLength = await bookingsPage.Items.length;
    await bookingsActions.cancelBooking();
    const newBookingCardsLength = await bookingsPage.Items.length;

    expect(newBookingCardsLength).toEqual(Math.max(bookingCardsLength - 1, 0));
  });
});
