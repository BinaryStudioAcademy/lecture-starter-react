import { AppRoute } from '../common/enums/enums';
import { BookingCard as BookingCardComponent } from '../page-components/page-components';

class Bookings {
  async openPage(): Promise<void> {
    await browser.url(AppRoute.BOOKINGS);
  }

  async cancelBooking(): Promise<void> {
    const bookingCardComponent = new BookingCardComponent();

    await bookingCardComponent.Cancel_Button.waitForClickable();
    await bookingCardComponent.Cancel_Button.click();
  }
}

export { Bookings };
