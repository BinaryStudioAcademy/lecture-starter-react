import { TripLevel } from '~/common/enums/enums';

type CreateTripDto = {
  title: string;
  description: string;
  level: TripLevel;
  duration: number;
  price: number;
  image: string;
};

export { CreateTripDto };
