import { bookingData } from '../../data/data';
import {
  Main as MainActions,
  Trip as TripActions,
} from '../../page-actions/page-actions';
import { BookTripModal as BookTripModalComponent } from '../../page-components/page-components';

const bookTripModalComponent = new BookTripModalComponent();
const mainActions = new MainActions();
const tripActions = new TripActions();

describe('Book Trip Modal', async () => {
  before(async () => {
    await mainActions.openPage();
    await mainActions.goToTripPage();
    await tripActions.openBookTripModal();
  });

  it('should have title', async () => {
    await bookTripModalComponent.Title_Content.waitForExist();
  });

  it('should have duration', async () => {
    await bookTripModalComponent.Duration_Content.waitForExist();
  });

  it('should have level', async () => {
    await bookTripModalComponent.Level_Content.waitForExist();
  });

  it('should have date field', async () => {
    await bookTripModalComponent.Date_Field.waitForExist();
  });

  it('should have guests field', async () => {
    await bookTripModalComponent.Guests_Field.waitForExist();
  });

  it('should calculate total price', async () => {
    const { guests, date } = bookingData;
    const multiplier = 2;

    await tripActions.fillBookTripForm({ date, guests });
    const price = await bookTripModalComponent.Price_Content.getText();

    await tripActions.fillBookTripForm({ date, guests: guests * multiplier });
    const newPrice = await bookTripModalComponent.Price_Content.getText();

    expect(parseFloat(newPrice)).toEqual(parseFloat(price) * multiplier);
  });

  it('should close modal on close button click', async () => {
    await tripActions.closeBookTripModal();
    await bookTripModalComponent.Element_Container.waitForDisplayed({
      reverse: true,
    });
  });
});
