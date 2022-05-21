import { BookingExtractDto } from './booking-extract-dto.type';

type BookingDto = BookingExtractDto & {
  totalPrice: number;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
};

export { BookingDto };
