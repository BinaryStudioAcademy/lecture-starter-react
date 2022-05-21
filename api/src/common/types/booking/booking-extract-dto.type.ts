type BookingExtractDto = {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  date: Date;
  createdAt: Date;
};

export { BookingExtractDto };
