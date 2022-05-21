import { TripLevel } from '~/common/enums/enums';

type TripDto = {
  id: string;
  title: string;
  description: string;
  level: TripLevel;
  duration: number;
  price: number;
  image: string;
};

export { TripDto };
