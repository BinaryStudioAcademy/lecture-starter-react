import { CollectionName } from '~/common/enums/enums';
import {
  Trip as TripModel,
  User as UserModel,
  Booking as BookingModel,
} from '~/data/models/models';

type Db = {
  [CollectionName.USERS]: UserModel[];
  [CollectionName.TRIPS]: TripModel[];
  [CollectionName.BOOKINGS]: BookingModel[];
};

export { Db };
