import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { Trip as TripModel } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  tripCollection: TripModel[];
};

class Trip {
  #tripCollection: TripModel[];

  constructor({ tripCollection }: Constructor) {
    this.#tripCollection = tripCollection;
  }

  getAll(): TripModel[] {
    return this.#tripCollection.slice();
  }

  getById(id: string): TripModel {
    const trip = this.#tripCollection.find(({ id: tripId }) => id === tripId);

    if (!trip) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.TRIP_NOT_FOUND,
      });
    }

    return trip;
  }

  create(trip: TripModel): TripModel {
    this.#tripCollection.push(trip);

    return trip;
  }
}

export { Trip };
