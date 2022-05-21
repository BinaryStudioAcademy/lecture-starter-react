import { User as UserRepository } from '~/data/repositories/repositories';
import { User as UserModel } from '~/data/models/models';
import { CreateUserDto, SignInUserDto, UserDto } from '~/common/types/types';
import { ExceptionMessage } from '~/common/enums/enums';
import { Encryption as EncryptionService } from '../services';
import { InvalidCredentialsError } from '~/exceptions/exceptions';

type Constructor = {
  userRepository: UserRepository;
  encryptionService: EncryptionService;
};

class User {
  #userRepository: UserRepository;
  #encryptionService: EncryptionService;

  constructor({ userRepository, encryptionService }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptionService = encryptionService;
  }

  getById(id: string): Promise<UserDto> {
    const user = this.#userRepository.getById(id);

    return user.then(UserModel.toResponse);
  }

  async create(payload: CreateUserDto): Promise<UserDto> {
    const { password } = payload;
    const passwordSalt = await this.#encryptionService.createSalt();
    const passwordHash = await this.#encryptionService.hash(
      password,
      passwordSalt,
    );

    const user = UserModel.create({
      ...payload,
      password: passwordHash,
    });

    return this.#userRepository.create(user).then(UserModel.toResponse);
  }

  async verifyLoginCredentials({
    email,
    password,
  }: SignInUserDto): Promise<UserDto> {
    const user = await this.#userRepository.findOne({ email });

    if (!user) {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.INVALID_CREDENTIALS,
      });
    }

    const isPasswordEqual = await this.#encryptionService.compare(
      password,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.INVALID_CREDENTIALS,
      });
    }

    return UserModel.toResponse(user);
  }
}

export { User };
