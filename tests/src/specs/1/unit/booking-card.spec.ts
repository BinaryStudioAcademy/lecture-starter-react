import { BookingCard as BookingCardComponent } from '../../../page-components/page-components';
import { Bookings as BookingsActions } from '../../../page-actions/page-actions';

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
});
