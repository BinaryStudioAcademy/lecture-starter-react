import { Trip as TripPage } from '../../../page-objects/page-objects';
import {
  Main as MainActions,
  Trip as TripActions,
} from '../../../page-actions/page-actions';
import { BookTripModal as BookTripModalComponent } from '../../../page-components/page-components';

const tripPage = new TripPage();
const bookTripModalComponent = new BookTripModalComponent();
const mainActions = new MainActions();
const tripActions = new TripActions();

describe('Trip Page', async () => {
  before(async () => {
    await mainActions.openPage();
    await mainActions.goToTripPage();
  });

  it('should have title', async () => {
    await tripPage.Title_Content.waitForExist();
  });

  it('should have image', async () => {
    await tripPage.Image_Content.waitForExist();
  });

  it('should have duration', async () => {
    await tripPage.Duration_Content.waitForExist();
  });

  it('should have level', async () => {
    await tripPage.Level_Content.waitForExist();
  });

  it('should have price', async () => {
    await tripPage.Price_Content.waitForExist();
  });

  it('should have description', async () => {
    await tripPage.Description_Content.waitForExist();
  });

  it('should open modal on book a trip button click', async () => {
    await tripActions.openBookTripModal();
    await bookTripModalComponent.Element_Container.waitForDisplayed();
  });
});
