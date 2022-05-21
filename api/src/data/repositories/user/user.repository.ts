import { Collection, Filter, ObjectId, WithId } from 'mongodb';
import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import { DocumentModel } from '~/common/types/types';
import { User as UserModel } from '~/data/models/models';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  userCollection: Collection<DocumentModel<UserModel>>;
};

class User {
  #userCollection: Collection<DocumentModel<UserModel>>;

  constructor({ userCollection }: Constructor) {
    this.#userCollection = userCollection;
  }

  async getById(id: string): Promise<UserModel> {
    const user = await this.#userCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    return User.documentToModel(user);
  }

  async getOne(search: Partial<DocumentModel<UserModel>>): Promise<UserModel> {
    const user = await this.#userCollection.findOne(search);

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    return User.documentToModel(user);
  }

  async findOne(search: Partial<DocumentModel<UserModel>>): Promise<UserModel | null> {
    const user = await this.#userCollection.findOne(search);

    return user ? User.documentToModel(user) : null;
  }

  async create(payload: DocumentModel<UserModel>): Promise<UserModel> {
    const { email } = payload;

    const user = await this.#userCollection.findOne({
      email,
    });

    if (user) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.USER_ALREADY_EXISTS,
      });
    }

    const { insertedId } = await this.#userCollection.insertOne(payload);

    return this.getById(insertedId.toString());
  }

  async update(id: string, payload: Filter<DocumentModel<UserModel>>): Promise<void> {
    this.#userCollection.updateOne({ _id: new ObjectId(id) }, payload);
  }

  static documentToModel(document: WithId<DocumentModel<UserModel>>): UserModel {
    const { _id: objectId, fullName, email, password, createdAt } = document;

    const id = objectId.toString();

    return new UserModel({
      id,
      fullName,
      email,
      password,
      createdAt,
    });
  }
}

export { User };
