import jwt from 'jsonwebtoken';
import { ENV } from '~/common/enums/enums';

class Token {
  create<T extends Record<string, unknown>>(data: T): string {
    return jwt.sign(data, ENV.JWT.SECRET, {
      expiresIn: ENV.JWT.EXPIRES_IN,
    });
  }

  verify<T extends Record<string, unknown>>(token: string): T {
    return jwt.verify(token, ENV.JWT.SECRET) as T;
  }
}

export { Token };
