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

  signIn(id: string): SignInUserResponseDto {
    return {
      user: this.#userService.getById(id),
      token: this.#tokenService.create<TokenPayload>({ id }),
    };
  }

  getAuthorizedUser(token: string): UserDto {
    try {
      const { id } = this.#tokenService.verify<TokenPayload>(token);

      return this.#userService.getById(id);
    } catch {
      throw new InvalidCredentialsError({
        message: ExceptionMessage.INVALID_TOKEN,
      });
    }
  }
}

export { Auth };
