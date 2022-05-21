import { BookingExtract } from '../booking-extract/booking-extract.model';

type Constructor = BookingExtract & {
  totalPrice: number;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
};

class Booking extends BookingExtract {
  totalPrice: number;
  trip: {
    title: string;
    duration: number;
    price: number;
  };

  constructor({ totalPrice, trip, ...payload }: Constructor) {
    super(payload);
    this.totalPrice = totalPrice;
    this.trip = trip;
  }
}

export { Booking };
