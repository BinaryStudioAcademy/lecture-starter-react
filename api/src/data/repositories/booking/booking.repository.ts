import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { Booking as BookingModel } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  bookingCollection: BookingModel[];
};

class Booking {
  #bookingCollection: BookingModel[];

  constructor({ bookingCollection }: Constructor) {
    this.#bookingCollection = bookingCollection;
  }

  getById(id: string): BookingModel {
    const booking = this.#bookingCollection.find(
      ({ id: bookingId }) => id === bookingId,
    );

    if (!booking) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.BOOKING_NOT_FOUND,
      });
    }

    return booking;
  }

  getByUser(userId: string): BookingModel[] {
    const bookings = this.#bookingCollection.filter(
      ({ userId: id }) => userId === id,
    );

    return bookings;
  }

  create(booking: BookingModel): BookingModel {
    this.#bookingCollection.push(booking);

    return booking;
  }

  delete(id: string): void {
    const booking = this.getById(id);

    this.#bookingCollection.splice(this.#bookingCollection.indexOf(booking), 1);
  }
}

export { Booking };
