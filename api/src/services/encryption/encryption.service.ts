import { hash, genSalt, compare } from 'bcrypt';

type Constructor = {
  saltRounds: number;
};

class Encryption {
  #saltRounds: number;

  constructor({ saltRounds }: Constructor) {
    this.#saltRounds = saltRounds;
  }

  createSalt(): Promise<string> {
    return genSalt(this.#saltRounds);
  }

  hash(data: string, salt: string): Promise<string> {
    return hash(data, salt);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
}

export { Encryption };
