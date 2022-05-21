import { Booking as BookingRepository } from '~/data/repositories/repositories';
import { BookingExtract as BookingExtractModel } from '~/data/models/models';
import { CreateBookingDto, BookingDto } from '~/common/types/types';
import { Trip as TripService, User as UserService } from '../services';

type Constructor = {
  bookingRepository: BookingRepository;
  userService: UserService;
  tripService: TripService;
};

class Booking {
  #bookingRepository: BookingRepository;
  #userService: UserService;
  #tripService: TripService;

  constructor({ bookingRepository, tripService, userService }: Constructor) {
    this.#bookingRepository = bookingRepository;
    this.#tripService = tripService;
    this.#userService = userService;
  }

  getByUser(userId: string): Promise<BookingDto[]> {
    return this.#bookingRepository.getByUser(userId);
  }

  async create(payload: CreateBookingDto): Promise<BookingDto> {
    const { userId, tripId } = payload;

    await this.#userService.getById(userId);
    await this.#tripService.getById(tripId);

    const booking = BookingExtractModel.create(payload);

    return this.#bookingRepository.create(booking);
  }

  delete(id: string): Promise<void> {
    return this.#bookingRepository.delete(id);
  }
}

export { Booking };
