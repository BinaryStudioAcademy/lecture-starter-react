import { TripLevel } from '~/common/enums/enums';
import { CreateTripDto, DocumentModel } from '~/common/types/types';

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
  }: CreateTripDto): DocumentModel<Trip> {
    const { id, ...user } = new Trip({
      id: '',
      title,
      description,
      level,
      duration,
      price,
      image,
      createdAt: new Date(),
    });

    return user;
  }
}

export { Trip };
