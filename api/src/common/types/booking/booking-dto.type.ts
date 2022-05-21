type BookingDto = {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  date: Date;
  createdAt: Date;
  totalPrice: number;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
};

export { BookingDto };
