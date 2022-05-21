import { Collection, ObjectId, WithId } from 'mongodb';
import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { DocumentModel } from '~/common/types/types';
import { Trip as TripModel } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  tripCollection: Collection<DocumentModel<TripModel>>;
};

class Trip {
  #tripCollection: Collection<DocumentModel<TripModel>>;

  constructor({ tripCollection }: Constructor) {
    this.#tripCollection = tripCollection;
  }

  async getAll(): Promise<TripModel[]> {
    const trips = await this.#tripCollection.find().toArray();

    return trips.map(Trip.documentToModel);
  }

  async getById(id: string): Promise<TripModel> {
    const trip = await this.#tripCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!trip) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.TRIP_NOT_FOUND,
      });
    }

    return Trip.documentToModel(trip);
  }

  async create(payload: DocumentModel<TripModel>): Promise<TripModel> {
    const { insertedId } = await this.#tripCollection.insertOne(payload);

    return this.getById(insertedId.toString());
  }

  static documentToModel(
    document: WithId<DocumentModel<TripModel>>,
  ): TripModel {
    const {
      _id: objectId,
      title,
      description,
      level,
      duration,
      price,
      image,
      createdAt,
    } = document;

    const id = objectId.toString();

    return new TripModel({
      id,
      title,
      description,
      level,
      duration,
      price,
      image,
      createdAt,
    });
  }
}

export { Trip };
