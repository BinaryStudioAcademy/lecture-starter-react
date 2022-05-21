import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';
import { initRepositories } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Trip } from './trip/trip.service';
import { Token } from './token/token.service';
import { Encryption } from './encryption/encryption.service';
import { Booking } from './booking/booking.service';

type InitServicesReturn = {
  auth: Auth;
  user: User;
  trip: Trip;
  booking: Booking;
};

const initServices = (repositories: ReturnType<typeof initRepositories>): InitServicesReturn => {
  const { user: userRepository, trip: tripRepository, booking: bookingRepository } = repositories;

  const token = new Token();

  const encryption = new Encryption({
    saltRounds: USER_PASSWORD_SALT_ROUNDS,
  });

  const user = new User({
    userRepository,
    encryptionService: encryption,
  });

  const auth = new Auth({
    tokenService: token,
    userService: user,
  });

  const trip = new Trip({
    tripRepository,
  });

  const booking = new Booking({
    bookingRepository,
    userService: user,
    tripService: trip,
  });

  return { user, auth, trip, booking };
};

export { initServices, type Encryption, type Auth, type Token, type User, type Trip, type Booking };
