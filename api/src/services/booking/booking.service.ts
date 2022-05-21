import { Booking as BookingRepository } from '~/data/repositories/repositories';
import { Booking as BookingModel } from '~/data/models/models';
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
    const { title, duration, price } = await this.#tripService.getById(tripId);

    const booking = BookingModel.create({
      ...payload,
      trip: {
        title,
        duration,
        price,
      },
    });

    return this.#bookingRepository.create(booking);
  }

  delete(id: string): Promise<void> {
    return this.#bookingRepository.delete(id);
  }
}

export { Booking };
