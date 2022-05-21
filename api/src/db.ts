import { CollectionName } from '~/common/enums/enums';
import { Db } from '~/common/types/types';

const db: Db = {
  [CollectionName.USERS]: [],
  [CollectionName.TRIPS]: [],
  [CollectionName.BOOKINGS]: [],
};

export { db };
