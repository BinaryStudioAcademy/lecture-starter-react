import { Trip as TripRepository } from '~/data/repositories/repositories';
import { CreateTripDto, TripDto } from '~/common/types/types';
import { Trip as TripModel } from '~/data/models/models';

type Constructor = {
  tripRepository: TripRepository;
};

class Trip {
  #tripRepository: TripRepository;

  constructor({ tripRepository }: Constructor) {
    this.#tripRepository = tripRepository;
  }

  getAll(): Promise<TripDto[]> {
    return this.#tripRepository.getAll();
  }

  getById(id: string): Promise<TripDto> {
    return this.#tripRepository.getById(id);
  }

  create(payload: CreateTripDto): Promise<TripDto> {
    const trip = TripModel.create(payload);

    return this.#tripRepository.create(trip);
  }
}

export { Trip };
