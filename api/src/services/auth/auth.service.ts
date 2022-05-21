import { ExceptionMessage } from '~/common/enums/enums';
import {
  CreateUserDto,
  SignInUserResponseDto,
  SignUpUserResponseDto,
  TokenPayload,
  UserDto,
} from '~/common/types/types';
import { InvalidCredentialsError } from '~/exceptions/exceptions';
import { Token as TokenService, User as UserService } from '../services';

type Constructor = {
  tokenService: TokenService;
  userService: UserService;
};

class Auth {
  #tokenService: TokenService;
  #userService: UserService;

  constructor({ tokenService, userService }: Constructor) {
    this.#tokenService = tokenService;
    this.#userService = userService;
  }

  async signUp(payload: CreateUserDto): Promise<SignUpUserResponseDto> {
    const { id } = await this.#userService.create(payload);

    return this.signIn(id);
  }

  async signIn(id: string): Promise<SignInUserResponseDto> {
    return {
      user: await this.#userService.getById(id),
      token: this.#tokenService.create<TokenPayload>({ id }),
    };
  }

  async getAuthorizedUser(token: string): Promise<UserDto> {
    try {
      const { id } = this.#tokenService.verify<TokenPayload>(token);

      return await this.#userService.getById(id);
    } catch {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }
  }
}

export { Auth };
