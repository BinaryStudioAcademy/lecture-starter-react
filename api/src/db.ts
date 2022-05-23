import { CollectionName } from '~/common/enums/enums';
import { Db } from '~/common/types/types';
import { Trip as TripModel } from './data/models/models';
import { initRepositories } from './data/repositories/repositories';
import { trips as tripsSeed } from './data/seed-data/trips-seed';

const initDb = (): ReturnType<typeof initRepositories> => {
  const db: Db = {
    [CollectionName.USERS]: [],
    [CollectionName.BOOKINGS]: [],
    [CollectionName.TRIPS]: [],
  };

  const repositories = initRepositories(db);
  const trips = tripsSeed.map(TripModel.create);

  trips.map((trip) => repositories.trip.create(trip));

  return repositories;
};

export { initDb };
