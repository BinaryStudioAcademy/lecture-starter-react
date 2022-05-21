import {
  BookingDto,
  CreateBookingDto,
  TripExtractDto,
} from '~/common/types/types';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: Date;
  trip: TripExtractDto;
  totalPrice: number;
  createdAt: Date;
};

class Booking {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: Date;
  trip: TripExtractDto;
  totalPrice: number;
  createdAt: Date;

  constructor({
    id,
    userId,
    tripId,
    guests,
    date,
    totalPrice,
    trip,
    createdAt,
  }: Constructor) {
    this.id = id;
    this.userId = userId;
    this.tripId = tripId;
    this.guests = guests;
    this.date = date;
    this.trip = trip;
    this.totalPrice = totalPrice;
    this.createdAt = createdAt;
  }

  static create({
    tripId,
    userId,
    guests,
    date,
    trip,
  }: CreateBookingDto & {
    trip: TripExtractDto;
  }): BookingDto {
    return new Booking({
      id: getRandomId(),
      userId,
      tripId,
      guests,
      date,
      trip,
      totalPrice: trip.price * guests,
      createdAt: new Date(),
    });
  }
}

export { Booking };
