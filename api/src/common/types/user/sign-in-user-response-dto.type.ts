import { UserDto } from './user-dto.type';

type SignInUserResponseDto = {
  user: UserDto;
  token: string;
};

export { SignInUserResponseDto };
