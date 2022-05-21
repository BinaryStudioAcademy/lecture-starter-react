import { Collection, ObjectId, WithId } from 'mongodb';
import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { BookingExtractDto, DocumentModel } from '~/common/types/types';
import { Booking as BookingModel, BookingExtract } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';
import { BOOKING_PIPELINES } from './common/constants';

type Constructor = {
  bookingCollection: Collection<DocumentModel<BookingExtract>>;
};

class Booking {
  #bookingCollection: Collection<DocumentModel<BookingExtract>>;

  constructor({ bookingCollection }: Constructor) {
    this.#bookingCollection = bookingCollection;
  }

  async getById(id: string): Promise<BookingModel> {
    const booking = await this.#bookingCollection
      .aggregate<WithId<DocumentModel<BookingModel>>>([
        { $match: { _id: new ObjectId(id) } },
        ...BOOKING_PIPELINES,
      ])
      .next();

    if (!booking) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.BOOKING_NOT_FOUND,
      });
    }

    return Booking.documentToModel(booking);
  }

  getByUser(userId: string): Promise<BookingModel[]> {
    return this.#bookingCollection
      .aggregate<BookingModel>([{ $match: { userId } }, BOOKING_PIPELINES])
      .toArray();
  }

  async create(payload: DocumentModel<BookingExtractDto>): Promise<BookingModel> {
    const { insertedId } = await this.#bookingCollection.insertOne({
      ...payload,
    });

    return this.getById(insertedId.toString());
  }

  async delete(id: string): Promise<void> {
    await this.#bookingCollection.deleteOne({ _id: new ObjectId(id) });
  }

  static documentToModel(document: WithId<DocumentModel<BookingModel>>): BookingModel {
    const { _id: objectId, userId, tripId, guests, date, createdAt, totalPrice, trip } = document;

    const id = objectId.toString();

    return new BookingModel({
      id,
      userId,
      tripId,
      guests,
      date,
      createdAt,
      totalPrice,
      trip,
    });
  }
}

export { Booking };
