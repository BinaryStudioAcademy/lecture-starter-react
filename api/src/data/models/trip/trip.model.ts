import { TripLevel } from '~/common/enums/enums';
import { CreateTripDto } from '~/common/types/types';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  id: string;
  title: string;
  description: string;
  level: TripLevel;
  duration: number;
  price: number;
  image: string;
  createdAt: Date;
};

class Trip {
  id: string;
  title: string;
  description: string;
  level: TripLevel;
  duration: number;
  price: number;
  image: string;
  createdAt: Date;

  constructor({
    id,
    title,
    description,
    level,
    duration,
    price,
    image,
    createdAt,
  }: Constructor) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.level = level;
    this.duration = duration;
    this.price = price;
    this.image = image;
    this.createdAt = createdAt;
  }

  static create({
    title,
    description,
    level,
    duration,
    price,
    image,
  }: CreateTripDto): Trip {
    return new Trip({
      id: getRandomId(),
      title,
      description,
      level,
      duration,
      price,
      image,
      createdAt: new Date(),
    });
  }
}

export { Trip };
