import { UserDto } from './user-dto.type';

type SignUpUserResponseDto = {
  user: UserDto;
  token: string;
};

export { SignUpUserResponseDto };
