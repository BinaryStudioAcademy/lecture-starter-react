import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { User as UserModel } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  userCollection: UserModel[];
};

class User {
  #userCollection: UserModel[];

  constructor({ userCollection }: Constructor) {
    this.#userCollection = userCollection;
  }

  async getById(id: string): Promise<UserModel> {
    return this.getOne({ id });
  }

  async getOne(search: Partial<UserModel>): Promise<UserModel> {
    const user = await this.findOne(search);

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    return user;
  }

  async findOne(search: Partial<UserModel>): Promise<UserModel | null> {
    const user = this.#userCollection.find((user) => {
      return Object.entries(search).every(
        ([key, value]) => user[key as keyof UserModel] === value,
      );
    });

    return user ?? null;
  }

  async create(user: UserModel): Promise<UserModel> {
    const { email } = user;

    const lastUser = await this.findOne({
      email,
    });

    if (lastUser) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.USER_ALREADY_EXISTS,
      });
    }

    this.#userCollection.push(user);

    return user;
  }
}

export { User };
