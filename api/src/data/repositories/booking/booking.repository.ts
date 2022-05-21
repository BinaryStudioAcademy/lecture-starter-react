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

  async getById(id: string): Promise<BookingModel> {
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

  async getByUser(userId: string): Promise<BookingModel[]> {
    const bookings = this.#bookingCollection.filter(
      ({ userId: id }) => userId === id,
    );

    return bookings;
  }

  async create(booking: BookingModel): Promise<BookingModel> {
    this.#bookingCollection.push(booking);

    return booking;
  }

  async delete(id: string): Promise<void> {
    const booking = await this.getById(id);

    this.#bookingCollection.splice(this.#bookingCollection.indexOf(booking), 1);
  }
}

export { Booking };
