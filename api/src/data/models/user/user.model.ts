import { CreateUserDto, UserDto } from '~/common/types/types';
import { getRandomId } from '~/helpers/helpers';

type Constructor = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
};

class User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor({ id, fullName, email, password, createdAt }: Constructor) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  static create({ fullName, email, password }: CreateUserDto): User {
    return new User({
      id: getRandomId(),
      fullName,
      email,
      password,
      createdAt: new Date(),
    });
  }

  static toResponse(user: User): UserDto {
    const { password, ...response } = user;

    return response;
  }
}

export { User };
