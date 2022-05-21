import { Db, MongoClient } from 'mongodb';
import { ENV } from '~/common/enums/enums';

const connectToDatabase = async (): Promise<Db> => {
  const client = new MongoClient(ENV.DB.CONNECTION_STRING);

  await client.connect();

  return client.db();
};

export { connectToDatabase };
