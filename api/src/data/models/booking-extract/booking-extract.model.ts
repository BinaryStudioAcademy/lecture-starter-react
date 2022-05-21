import { BookingExtractDto } from '~/common/types/booking/booking-extract-dto.type';
import { CreateBookingDto, DocumentModel } from '~/common/types/types';

type Constructor = {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: Date;
  createdAt: Date;
};

class BookingExtract {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: Date;
  createdAt: Date;

  constructor({ id, userId, tripId, guests, date, createdAt }: Constructor) {
    this.id = id;
    this.userId = userId;
    this.tripId = tripId;
    this.guests = guests;
    this.date = date;
    this.createdAt = createdAt;
  }

  static create({
    tripId,
    userId,
    guests,
    date,
  }: CreateBookingDto): DocumentModel<BookingExtractDto> {
    const { id, ...booking } = new BookingExtract({
      id: '',
      userId,
      tripId,
      guests,
      date,
      createdAt: new Date(),
    });

    return booking;
  }
}

export { BookingExtract };
