import { Db } from 'mongodb';
import { CollectionName } from '~/common/enums/enums';
import { User } from './user/user.repository';
import { Trip } from './trip/trip.repository';
import { Booking } from './booking/booking.repository';

type InitRepositoriesReturn = {
  user: User;
  trip: Trip;
  booking: Booking;
};

const initRepositories = (db: Db): InitRepositoriesReturn => {
  const user = new User({
    userCollection: db.collection(CollectionName.USERS),
  });

  const trip = new Trip({
    tripCollection: db.collection(CollectionName.TRIPS),
  });

  const booking = new Booking({
    bookingCollection: db.collection(CollectionName.BOOKINGS),
  });

  return { user, trip, booking };
};

export { initRepositories, type User, type Trip, type Booking };
