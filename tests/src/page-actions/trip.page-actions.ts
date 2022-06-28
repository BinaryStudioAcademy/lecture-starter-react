import { AppRoute } from '../common/enums/enums';
import { CreateBookingPayload } from '../common/types/types';
import { Trip as TripPage } from '../page-objects/page-objects';
import { BookTripModal as BookTripModalComponent } from '../page-components/page-components';

const tripPage = new TripPage();
const bookTripModalComponent = new BookTripModalComponent();

class Trip {
  async openPage(id: string): Promise<void> {
    await browser.url(AppRoute.TRIP_$ID.replace(':id', id));
  }

  async openBookTripModal(): Promise<void> {
    await tripPage.BookTrip_Button.waitForClickable();
    await tripPage.BookTrip_Button.click();
  }

  async closeBookTripModal(): Promise<void> {
    await bookTripModalComponent.Close_Button.waitForClickable();
    await bookTripModalComponent.Close_Button.click();
  }

  async fillBookTripForm({ date, guests }: CreateBookingPayload): Promise<void> {
    await bookTripModalComponent.Date_Field.waitForExist();
    await bookTripModalComponent.Date_Field.setValue(date);

    await bookTripModalComponent.Guests_Field.waitForExist();
    await bookTripModalComponent.Guests_Field.setValue(guests);
  }

  async bookTrip(payload: CreateBookingPayload): Promise<void> {
    await this.openBookTripModal();
    await this.fillBookTripForm(payload);

    await bookTripModalComponent.BookTrip_Button.waitForClickable();
    await bookTripModalComponent.BookTrip_Button.click();
  }
}

export { Trip };
