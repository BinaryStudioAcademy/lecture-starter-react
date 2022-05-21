import { CreateUserDto, DocumentModel, UserDto } from '~/common/types/types';

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

  static create({ fullName, email, password }: CreateUserDto): DocumentModel<User> {
    const { id, ...user } = new User({
      id: '',
      fullName,
      email,
      password,
      createdAt: new Date(),
    });

    return user;
  }

  static toResponse(user: User): UserDto {
    const { password, ...response } = user;

    return response;
  }
}

export { User };
