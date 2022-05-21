import { TripExtractDto } from '../types';

type BookingDto = {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  date: Date;
  createdAt: Date;
  totalPrice: number;
  trip: TripExtractDto;
};

export { BookingDto };
